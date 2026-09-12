const DASH = "-"

export function wordlessIn(argv: readonly string[], said: string): string | null {
  const one = argv[0]
  if (one === undefined) return null
  if (one.startsWith(DASH)) return `a ${said} takes no flag, and this call named \`${one}\``
  return `a ${said} takes no word, and this call named \`${one}\``
}
