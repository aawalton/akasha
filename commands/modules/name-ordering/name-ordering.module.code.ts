export function inNameOrder(names: readonly string[]): readonly string[] {
  return [...names].sort((a, b) => a.localeCompare(b))
}
