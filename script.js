// Page navigation
document.addEventListener('DOMContentLoaded', function() {
    // Login functionality
    const loginForm = document.getElementById('login-form');
    const loginPage = document.getElementById('login-page');
    const app = document.getElementById('app');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simple validation - in a real app, you would validate credentials
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            // Update user name display
            document.getElementById('user-display-name').textContent = username;
            document.getElementById('user-display-name-budget').textContent = username;
            document.getElementById('user-display-name-reports').textContent = username;
            document.getElementById('user-display-name-settings').textContent = username;
            document.getElementById('username-settings').value = username;
            
            loginPage.classList.remove('active');
            app.classList.add('active');
        } else {
            alert('Please enter both username and password');
        }
    });
    
    // Navigation between pages
    const navLinks = document.querySelectorAll('.nav-link');
    const contentPages = document.querySelectorAll('.content-page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(nav => nav.classList.remove('active'));
            contentPages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding page
            const pageId = this.getAttribute('data-page') + '-page';
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            app.classList.remove('active');
            loginPage.classList.add('active');
            // Clear form
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        });
    }
    
    // Modal functionality
    const editBudgetBtn = document.getElementById('edit-budget');
    const editBudgetModal = document.getElementById('edit-budget-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const saveBudgetBtn = document.getElementById('save-budget-btn');
    
    // Edit Categories
    const editCategoriesBtn = document.getElementById('edit-categories');
    const editCategoriesModal = document.getElementById('edit-categories-modal');
    const saveCategoriesBtn = document.getElementById('save-categories-btn');
    
    // Profile update
    const updateProfileBtn = document.getElementById('update-profile-btn');
    
    // Open edit budget modal
    if (editBudgetBtn) {
        editBudgetBtn.addEventListener('click', function() {
            editBudgetModal.classList.add('active');
        });
    }
    
    // Open edit categories modal
    if (editCategoriesBtn) {
        editCategoriesBtn.addEventListener('click', function() {
            editCategoriesModal.classList.add('active');
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Save budget changes
    if (saveBudgetBtn) {
        saveBudgetBtn.addEventListener('click', function() {
            const totalBudget = document.getElementById('edit-total-budget').value;
            const totalSpent = document.getElementById('edit-total-spent').value;
            const totalRemaining = totalBudget - totalSpent;
            
            // Update dashboard
            document.getElementById('total-budget').textContent = formatCurrency(totalBudget);
            document.getElementById('total-spent').textContent = formatCurrency(totalSpent);
            document.getElementById('total-remaining').textContent = formatCurrency(totalRemaining);
            
            // Update budget page
            document.getElementById('monthly-total-budget').textContent = formatCurrency(totalBudget);
            document.getElementById('monthly-total-spent').textContent = formatCurrency(totalSpent);
            document.getElementById('monthly-total-remaining').textContent = formatCurrency(totalRemaining);
            
            // Close modal
            editBudgetModal.classList.remove('active');
            
            alert('Budget updated successfully!');
        });
    }
    
    // Save categories changes
    if (saveCategoriesBtn) {
        saveCategoriesBtn.addEventListener('click', function() {
            const housing = document.getElementById('edit-housing').value;
            const food = document.getElementById('edit-food').value;
            const utilities = document.getElementById('edit-utilities').value;
            const entertainment = document.getElementById('edit-entertainment').value;
            const debt = document.getElementById('edit-debt').value;
            
            // Update category amounts on dashboard
            const categoryItems = document.querySelectorAll('.category-item');
            categoryItems[0].querySelector('.category-amount').textContent = formatCurrency(housing);
            categoryItems[1].querySelector('.category-amount').textContent = formatCurrency(food);
            categoryItems[2].querySelector('.category-amount').textContent = formatCurrency(utilities);
            categoryItems[3].querySelector('.category-amount').textContent = formatCurrency(entertainment);
            categoryItems[4].querySelector('.category-amount').textContent = formatCurrency(debt);
            
            // Close modal
            editCategoriesModal.classList.remove('active');
            
            alert('Categories updated successfully!');
        });
    }
    
    // Update profile
    if (updateProfileBtn) {
        updateProfileBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username-settings').value;
            
            // Update user name display everywhere
            document.getElementById('user-display-name').textContent = name;
            document.getElementById('user-display-name-budget').textContent = name;
            document.getElementById('user-display-name-reports').textContent = name;
            document.getElementById('user-display-name-settings').textContent = name;
            
            alert('Profile updated successfully!');
        });
    }
    
    // Add budget button
    const addBudgetBtn = document.getElementById('add-budget-btn');
    if (addBudgetBtn) {
        addBudgetBtn.addEventListener('click', function() {
            editBudgetModal.classList.add('active');
        });
    }
    
    // Add budget category button
    const addBudgetCategoryBtn = document.getElementById('add-budget-category-btn');
    if (addBudgetCategoryBtn) {
        addBudgetCategoryBtn.addEventListener('click', function() {
            editCategoriesModal.classList.add('active');
        });
    }
    
    // Currency formatting function
    function formatCurrency(amount) {
        return '₹' + Number(amount).toLocaleString('en-IN');
    }
    
    // Initialize with Indian Rupees formatting
    document.querySelectorAll('.currency').forEach(element => {
        const currentText = element.textContent;
        if (currentText.includes('$')) {
            // Convert from dollars to rupees (rough conversion)
            const dollarAmount = parseFloat(currentText.replace('$', '').replace(',', ''));
            const rupeeAmount = dollarAmount * 83; // Approximate conversion rate
            element.textContent = formatCurrency(rupeeAmount);
        } else if (!currentText.includes('₹')) {
            // Add rupee symbol if not present
            const amount = parseFloat(currentText.replace(',', ''));
            element.textContent = formatCurrency(amount);
        }
    });
    
    // Initialize charts
    initializeCharts();
});

// Chart initialization
function initializeCharts() {
    // Monthly Spending Trend Chart
    const spendingCtx = document.getElementById('spendingChart').getContext('2d');
    const spendingChart = new Chart(spendingCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Spending',
                data: [2500, 2800, 3200, 2650, 3000, 2900],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
    
    // Budget Allocation Chart
    const allocationCtx = document.getElementById('allocationChart').getContext('2d');
    const allocationChart = new Chart(allocationCtx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Food', 'Transport', 'Savings', 'Entertainment'],
            datasets: [{
                data: [1200, 800, 300, 400, 500],
                backgroundColor: [
                    '#4361ee',
                    '#3a0ca3',
                    '#4cc9f0',
                    '#f72585',
                    '#7209b7'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Expense Breakdown Chart
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(expenseCtx, {
        type: 'bar',
        data: {
            labels: ['Housing', 'Food', 'Utilities', 'Entertainment', 'Debt'],
            datasets: [{
                label: 'Expenses',
                data: [1200, 550, 280, 320, 300],
                backgroundColor: '#4361ee'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
    
    // Net Worth Trend Chart
    const netWorthCtx = document.getElementById('netWorthChart').getContext('2d');
    const netWorthChart = new Chart(netWorthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Net Worth',
                data: [15000, 16500, 17200, 18500, 19200, 21000],
                borderColor: '#38a169',
                backgroundColor: 'rgba(56, 161, 105, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});