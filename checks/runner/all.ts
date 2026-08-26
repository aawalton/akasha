import type { Check, CheckOutcome } from "../check-shape.ts"

export function runAll(
  checks: readonly Check[],
  paths: readonly string[]
): readonly CheckOutcome[] {
  return checks.map((check) => ({ slug: check.slug, failures: check.run(paths) }))
}
