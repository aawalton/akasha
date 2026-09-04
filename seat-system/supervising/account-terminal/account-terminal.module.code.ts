const terminalAccounts = new Set<string>()

export function markAccountTerminal(account: string): boolean {
  if (terminalAccounts.has(account)) return false
  terminalAccounts.add(account)
  return true
}

export function isAccountTerminal(account: string): boolean {
  return terminalAccounts.has(account)
}

export function clearAccountTerminal(account: string): boolean {
  return terminalAccounts.delete(account)
}
