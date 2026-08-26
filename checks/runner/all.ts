import type { Act, Check, CheckFailure, CheckRun, Tree } from "../check-shape.ts"

const NO_ACT = "judges its author, so nothing it asks has an answer where no act is being judged"

export function judgesAuthor(check: Check): boolean {
  return check.needsAuthor === true
}

function acting(check: Check, act: Act | null): Act {
  if (act === null) throw new Error(`${check.slug} ${NO_ACT}`)
  return act
}

export function failuresOf(
  check: Check,
  paths: readonly string[],
  tree: Tree,
  act: Act | null
): readonly CheckFailure[] {
  if (check.needs === "tree") {
    const given = { root: tree.root, paths, tree }
    return check.needsAuthor === true ? check.run(given, acting(check, act)) : check.run(given)
  }
  const failures: CheckFailure[] = []
  for (const path of paths) {
    const at = { root: tree.root, path }
    if (check.needs === "path") {
      const said = check.needsAuthor === true ? check.run(at, acting(check, act)) : check.run(at)
      for (const reason of said) failures.push({ path, reason })
      continue
    }
    const body = tree.at(path)
    if (body === null) continue
    const file = { root: tree.root, path, body }
    const said = check.needsAuthor === true ? check.run(file, acting(check, act)) : check.run(file)
    for (const reason of said) failures.push({ path, reason })
  }
  return failures
}

function runOf(check: Check, paths: readonly string[], tree: Tree, act: Act | null): CheckRun {
  try {
    return { slug: check.slug, failures: failuresOf(check, paths, tree, act) }
  } catch (thrown) {
    return { slug: check.slug, threw: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function runAll(
  checks: readonly Check[],
  paths: readonly string[],
  tree: Tree,
  act: Act | null
): readonly CheckRun[] {
  return checks.map((check) => runOf(check, paths, tree, act))
}
