export function rankOf(key: string, ranks: Readonly<Record<string, number>>): number {
  return ranks[key] ?? Number.MAX_SAFE_INTEGER
}
