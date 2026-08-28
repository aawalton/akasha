import type { Act, Check, CheckFailure, CheckRun, Tree, Was } from "../check/check-shape.ts"

const NO_ACT = "judges its author, so nothing it asks has an answer where no act is being judged"

function acting(check: Check, act: Act | null): Act {
  if (act === null) throw new Error(`${check.slug} ${NO_ACT}`)
  return act
}

export type Held = {
  readonly act: Act | null
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
  const act = held.act
  if (check.needs === "tree") {
    const given = { root: tree.root, paths, tree, keep: held.keep }
    if (check.needsAuthor === true) return check.run(given, acting(check, act))
    if (check.needsBefore === true) return check.run(given, wasOf(held))
    return check.run(given)
  }
  const failures: CheckFailure[] = []
  for (const path of paths) {
    const at = { root: tree.root, path }
    if (check.needs === "path") {
      const said =
        check.needsAuthor === true
          ? check.run(at, acting(check, act))
          : check.needsBefore === true
            ? check.run(at, wasOf(held))
            : check.run(at)
      for (const reason of said) failures.push({ path, reason })
      continue
    }
    const body = tree.at(path)
    if (body === null) continue
    const file = { root: tree.root, path, body }
    const said =
      check.needsAuthor === true
        ? check.run(file, acting(check, act))
        : check.needsBefore === true
          ? check.run(file, wasOf(held))
          : check.run(file)
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
