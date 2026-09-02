import { join, resolve } from "node:path"
import { compiled, hostOver, insideOf, SETTINGS } from "@akasha/code-system/code-typing"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import ts from "typescript"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  bodiesOf,
  declaringIn,
  type Found,
  foundOf,
} from "../typecheck/typecheck.code-check.code.ts"

const DECLARED = ".d.ts"

const ELSEWHERE = "the declaration set does not agree as this change leaves it"

const BLIND =
  "this change carries a declaration file and the index names none, so the set would be judged empty"

const LOOKING: ts.CompilerOptions = { ...SETTINGS, skipLibCheck: false }

export function declaresIn(path: string): boolean {
  return compiled(path) && path.endsWith(DECLARED)
}

const DECLARATIONS: Selector<Body> = {
  named: "the declaration files akasha holds",
  isInput: (path) => declaresIn(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => declaresIn(one.path)),
}

export function ownedIn(root: string, said: ts.DiagnosticRelatedInformation): boolean {
  const file = said.file
  if (file === undefined) return false
  return insideOf(root, resolve(file.fileName)) !== null
}

export function apartFrom(root: string, said: ts.Diagnostic): boolean {
  const held = said.relatedInformation ?? []
  if (held.length === 0) return false
  return !held.some((one) => ownedIn(root, one))
}

export function rootedIn(change: Change, known: readonly string[]): readonly string[] {
  const held = new Set(known)
  for (const one of change.changed) {
    if (declaresIn(one) && change.after(one) !== null) held.add(one)
  }
  return [...held].sort()
}

export function programFor(change: Change, named: readonly string[]): ts.Program {
  const root = resolve(change.root)
  return ts.createProgram({
    rootNames: named.map((one) => join(root, one)),
    options: LOOKING,
    host: hostOver(
      root,
      bodiesOf(change, (_at, text) => text),
      named
    ),
  })
}

export function foundIn(change: Change, shadow: Shadow): readonly Found[] {
  const known = declaringIn(change, shadow.index)
  const named = rootedIn(change, known)
  if (named.length === 0) return []
  if (known.length === 0) throw new Error(BLIND)
  const root = resolve(change.root)
  const program = programFor(change, named)
  const found: Found[] = []
  for (const file of program.getSourceFiles()) {
    if (insideOf(root, resolve(file.fileName)) === null) continue
    const said = [...program.getSyntacticDiagnostics(file), ...program.getSemanticDiagnostics(file)]
    for (const one of said) {
      if (apartFrom(root, one)) continue
      found.push(foundOf(root, one))
    }
  }
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const changed = new Set(change.changed)
  return foundIn(change, shadow).map((one) => ({
    path: one.path,
    reason: changed.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`,
  }))
}

export const declarationsAgree = input(DECLARATIONS, refusalsIn)
