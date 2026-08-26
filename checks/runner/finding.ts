import type { CheckOutcome, Finding } from "../check-shape.ts"

export function findingsOf(
  outcome: CheckOutcome,
  paths: readonly string[]
): readonly Finding[] {
  if ("threw" in outcome) return []
  const reasons = new Map<string, string[]>()
  for (const path of paths) reasons.set(path, [])
  for (const failure of outcome.failures) {
    const held = reasons.get(failure.path)
    if (held === undefined) continue
    held.push(failure.reason)
  }
  return paths.map((path) => ({
    slug: outcome.slug,
    path,
    reasons: reasons.get(path) ?? [],
  }))
}
