import type { Check, CheckFailure, CheckRun, Tree, Was } from "../check/check-shape.ts"

export type Held = {
  readonly before: Tree | null
  readonly keep: () => string
}

function wasOf(held: Held): Was {
  return { before: held.before }
}

function failuresOf(
  check: Check,
  paths: readonly string[],
  tree: Tree,
  held: Held
): readonly CheckFailure[] {
  if (check.needs === "tree") {
    const given = { root: tree.root, paths, tree, keep: held.keep }
    if (check.needsBefore === true) return check.run(given, wasOf(held))
    return check.run(given)
  }
  const failures: CheckFailure[] = []
  for (const path of paths) {
    const at = { root: tree.root, path }
    if (check.needs === "path") {
      const said = check.needsBefore === true ? check.run(at, wasOf(held)) : check.run(at)
      for (const reason of said) failures.push({ path, reason })
      continue
    }
    const body = tree.at(path)
    if (body === null) continue
    const file = { root: tree.root, path, body }
    const said = check.needsBefore === true ? check.run(file, wasOf(held)) : check.run(file)
    for (const reason of said) failures.push({ path, reason })
  }
  return failures
}

function runOf(check: Check, paths: readonly string[], tree: Tree, held: Held): CheckRun {
  try {
    return { slug: check.slug, failures: failuresOf(check, paths, tree, held) }
  } catch (thrown) {
    return { slug: check.slug, threw: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function runAll(
  checks: readonly Check[],
  paths: readonly string[],
  tree: Tree,
  held: Held
): readonly CheckRun[] {
  return checks.map((check) => runOf(check, paths, tree, held))
}
