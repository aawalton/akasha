export function reading(held: Record<string, string>): (path: string) => string | null {
  return (path) => held[path] ?? null
}
