import type { Check, CheckRun } from "../check-shape.ts"

function runOf(check: Check, paths: readonly string[], root: string): CheckRun {
  try {
    return { slug: check.slug, failures: check.run(paths, root) }
  } catch (thrown) {
    return { slug: check.slug, threw: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function runAll(
  checks: readonly Check[],
  paths: readonly string[],
  root: string
): readonly CheckRun[] {
  return checks.map((check) => runOf(check, paths, root))
}
