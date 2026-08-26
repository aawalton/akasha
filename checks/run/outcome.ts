import type { CheckRun, Outcome } from "../check/check-shape.ts"

export function outcomesOf(ran: CheckRun, paths: readonly string[]): readonly Outcome[] {
  if ("threw" in ran) return []
  const reasons = new Map<string, string[]>()
  for (const path of paths) reasons.set(path, [])
  for (const failure of ran.failures) {
    const held = reasons.get(failure.path)
    if (held === undefined) continue
    held.push(failure.reason)
  }
  return paths.map((path) => ({
    slug: ran.slug,
    path,
    reasons: reasons.get(path) ?? [],
  }))
}
