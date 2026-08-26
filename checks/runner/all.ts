import type { Check, CheckOutcome } from "../check-shape.ts"

function outcomeOf(check: Check, paths: readonly string[]): CheckOutcome {
  try {
    return { slug: check.slug, failures: check.run(paths) }
  } catch (thrown) {
    return { slug: check.slug, threw: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function runAll(
  checks: readonly Check[],
  paths: readonly string[]
): readonly CheckOutcome[] {
  return checks.map((check) => outcomeOf(check, paths))
}
