import type { Check, CheckRun, Tree } from "../check-shape.ts"

function runOf(check: Check, paths: readonly string[], tree: Tree): CheckRun {
  try {
    return { slug: check.slug, failures: check.run(paths, tree) }
  } catch (thrown) {
    return { slug: check.slug, threw: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function runAll(
  checks: readonly Check[],
  paths: readonly string[],
  tree: Tree
): readonly CheckRun[] {
  return checks.map((check) => runOf(check, paths, tree))
}
