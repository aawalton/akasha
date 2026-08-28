import { resolve } from "node:path"
import ts from "typescript"
import { carriesCode, outwardOf, specifiersIn, targetOf } from "../../imports/imports.ts"
import type { Check, CheckFailure, Tree, Was } from "../check-shape.ts"
import { appsIn, bodiesOf, type Fault, faultsOver, giveBackTheProgram, typegenFor } from "./program.ts"

export const ABSENT = "no `typescript` with an API to drive is reachable — run `bun install` in this repository"

function reaching(tree: Tree, seeds: ReadonlySet<string>): ReadonlySet<string> {
  const importedBy = new Map<string, string[]>()
  for (const path of tree.paths()) {
    if (!carriesCode(path)) continue
    const body = tree.at(path)
    if (body === null) continue
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      const target = targetOf(tree.root, path, specifier)
      if (target === null) continue
      importedBy.set(target, [...(importedBy.get(target) ?? []), path])
    }
  }
  const reached = new Set(seeds)
  const pending = [...seeds]
  while (pending.length > 0) {
    const one = pending.pop() as string
    for (const importer of importedBy.get(one) ?? []) {
      if (reached.has(importer)) continue
      reached.add(importer)
      pending.push(importer)
    }
  }
  return reached
}

function strandedBy(tree: Tree): readonly string[] {
  const gone = new Set(tree.gone().filter((one) => one.endsWith(".ts")).map((one) => resolve(one)))
  if (gone.size === 0) return []
  return [...reaching(tree, gone)].filter((one) => !gone.has(one))
}

function reachingOut(tree: Tree, paths: Iterable<string>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const path of paths) {
    if (!carriesCode(path)) continue
    const body = tree.at(path)
    if (body === null) continue
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      if (outwardOf(tree.root, path, specifier) === null) continue
      found.add(path)
      break
    }
  }
  return found
}

function alreadyIn(before: Tree, questioned: readonly string[]): ReadonlySet<string> {
  giveBackTheProgram()
  const read = bodiesOf(before)
  const found = new Set<string>()
  faultsOver(before, questioned, read, (fault) => found.add(fault.identity))
  return found
}

function importersIn(scope: ReadonlySet<string>, subjects: ReadonlySet<string>, was: Was): readonly string[] {
  if (was.before === null) return []
  return [...scope].filter((one) => !subjects.has(one) && one.endsWith(".ts"))
}

export const typecheck: Check = {
  slug: "typecheck",
  needs: "tree",
  needsBefore: true,
  run: ({ paths, tree }, was) => {
    const named = paths.filter((one) => one.endsWith(".ts")).map((one) => resolve(one))
    const subjects = new Set([...named, ...strandedBy(tree)])
    if (subjects.size === 0) return []
    if (typeof ts.createProgram !== "function") return [{ path: tree.root, reason: ABSENT }]

    const scope = reaching(tree, subjects)
    const importers = importersIn(scope, subjects, was)
    const roots = [...subjects, ...importers]

    const read = bodiesOf(tree)
    for (const under of appsIn(tree, read)) {
      if (!roots.some((one) => one.startsWith(`${under}/`))) continue
      typegenFor(tree.root, under)
    }
    const outward = reachingOut(tree, scope)

    const found: Fault[] = []
    faultsOver(tree, roots, read, (fault) => {
      if (!scope.has(fault.path) || outward.has(fault.path)) return
      found.push(fault)
    })

    const questioned = [...new Set(found.filter((one) => !subjects.has(one.path)).map((one) => one.path))]
    const already =
      questioned.length === 0 || was.before === null
        ? new Set<string>()
        : alreadyIn(was.before, questioned)

    const failures: CheckFailure[] = []
    const reported = new Set<string>()
    for (const fault of found) {
      if (!subjects.has(fault.path) && already.has(fault.identity)) continue
      if (reported.has(fault.identity)) continue
      reported.add(fault.identity)
      failures.push({ path: fault.path, reason: fault.reason })
    }
    return failures
  },
}

export default typecheck
