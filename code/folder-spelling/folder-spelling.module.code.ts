const UNDER = "/"

export function namedBy(said: string, folders: readonly string[]): string | null {
  if (!said.includes(UNDER)) return null
  for (const at of folders) {
    if (said === at || said.startsWith(`${at}${UNDER}`)) return at
  }
  return null
}

export function landedAt(said: string, from: string, to: string): string | null {
  if (namedBy(said, [from]) === null) return null
  return said === from ? to : `${to}${said.slice(from.length)}`
}
