const KEYED_WITHIN = 64

export function keyOf(held: unknown, at: number): string {
  return `${at}:${JSON.stringify(held).slice(0, KEYED_WITHIN)}`
}
