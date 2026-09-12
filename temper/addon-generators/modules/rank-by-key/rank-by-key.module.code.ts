export function rankOf(key: string, ranks: Readonly<Record<string, number>>): number {
  return ranks[key] ?? Number.MAX_SAFE_INTEGER
}

export function ranksOf(keys: readonly string[]): Record<string, number> {
  return Object.fromEntries(keys.map((key, at) => [key, at] as const))
}
