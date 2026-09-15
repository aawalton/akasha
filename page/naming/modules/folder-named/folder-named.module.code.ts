export function openingWith(named: string, above: readonly string[]): string | null {
  for (const one of above) {
    if (named === one || named.startsWith(`${one}-`)) return one
  }
  return null
}

export function strippedOf(named: string, above: readonly string[]): string | null {
  const one = openingWith(named, above)
  if (one === null) return named
  if (named === one) return null
  return strippedOf(named.slice(one.length + 1), above)
}
