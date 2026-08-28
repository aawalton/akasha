import { resolve } from "node:path"
import ts from "typescript"
import { carriesCode, outwardOf, specifiersIn, targetOf } from "../../imports/imports.ts"
import type { Check, CheckFailure, Tree, Was } from "../check-shape.ts"
import { appsIn, bodiesOf, faultsOver, typegenFor } from "./program.ts"

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

/**
 * Every fault the importers already held, in the tree as it stood before the change.
 *
 * ROOTED AT THE IMPORTERS ALONE, NOT THE WHOLE SCOPE. The only question this program answers
 * is whether a fault found in a file the change did not touch was already standing there, and that
 * is asked of exactly those files. Rooting it at the subjects as well would parse them and
 * everything they reach a second time for an answer nothing reads, because a fault in a file the
 * change touches is reported however old it is.
 */
function alreadyIn(before: Tree, importers: readonly string[]): ReadonlySet<string> {
  const read = bodiesOf(before)
  const found = new Set<string>()
  faultsOver(before, importers, read, (fault) => found.add(fault.identity))
  return found
}

/**
 * The files that import a subject without being one, which a program rooted at the subjects misses.
 *
 * A PROGRAM HOLDS WHAT ITS ROOTS IMPORT, NOT WHAT IMPORTS THEM. Rooting only at the subjects put
 * the whole reverse closure behind a filter it could never reach: a file importing a renamed export
 * was in scope and never in any program, so no diagnostic was ever produced for it and the write
 * landed with `none refused` over a tree no project-wide `tsc` accepts. `strandedBy` already pulled
 * importers in for a deletion, which covered one case of the class and left the rest.
 *
 * ONLY WHERE THERE IS AN EARLIER TREE TO ASK. A fault in a file the change did not touch is
 * reported only where it was absent before, so with no earlier tree there is nothing reportable and
 * rooting at these files would be a program built for an answer that is thrown away. That is what
 * keeps an audit costing exactly what it costs now.
 *
 * ONLY `.ts`, WHICH IS THE POPULATION THIS CHECK JUDGES. `subjects` is the changed `.ts` files, so
 * a `.tsx` importer is in scope and is not a subject on any run — an audit included. Carrying those
 * would put 724 files on the gate that no audit ever counts, and their lines can move under a
 * change, which would have an already-standing fault read as a new one.
 */
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
    // BEFORE THE CONFIGS ARE PARSED, so that a project's `include` sees the route types it names.
    // An app none of whose files are being judged is left alone, a run costing only what it reaches.
    for (const under of appsIn(tree, read)) {
      if (!roots.some((one) => one.startsWith(`${under}/`))) continue
      typegenFor(tree.root, under)
    }
    const outward = reachingOut(tree, scope)
    const already =
      importers.length === 0 || was.before === null
        ? new Set<string>()
        : alreadyIn(was.before, importers)

    const failures: CheckFailure[] = []
    const reported = new Set<string>()
    faultsOver(tree, roots, read, (fault) => {
      // WHAT THE CHANGE MERELY IMPORTS IS STILL NEVER REPORTED. `scope` is what reaches a subject;
      // a file only reached from one is in the program and outside this.
      if (!scope.has(fault.path) || outward.has(fault.path)) return
      // A FAULT IN A FILE THE CHANGE DID NOT TOUCH IS THE CHANGE'S ONLY WHERE IT WAS NOT THERE
      // BEFORE. A change that does not touch a failing file must not be blocked by it; a fault that
      // change causes in a file it did not touch is its own breakage and is refused.
      if (!subjects.has(fault.path) && already.has(fault.identity)) return
      if (reported.has(fault.identity)) return
      reported.add(fault.identity)
      failures.push({ path: fault.path, reason: fault.reason })
    })
    return failures
  },
}

export default typecheck
