import { dirname, join } from "node:path"
import ts from "typescript"
import { skimmedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { textIn } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

const ENDING = ".ts"

const RELATIVE = /^\.\.?\//

const SHOWN = 3

const ITSELF = "no module under akasha imports its way back around to itself"

export function landingOf(at: string, specifier: string): string | null {
  if (!RELATIVE.test(specifier)) return null
  return join(dirname(at), specifier)
}

function erasedImport(clause: ts.ImportClause | undefined): boolean {
  if (clause === undefined) return false
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bound = clause.namedBindings
  if (bound === undefined || !ts.isNamedImports(bound)) return false
  return bound.elements.length > 0 && bound.elements.every((one) => one.isTypeOnly)
}

function erasedExport(one: ts.ExportDeclaration): boolean {
  if (one.isTypeOnly) return true
  const clause = one.exportClause
  if (clause === undefined || !ts.isNamedExports(clause)) return false
  return clause.elements.length > 0 && clause.elements.every((each) => each.isTypeOnly)
}

export function reachedIn(at: string, text: string): readonly string[] {
  const source = skimmedAs(at, text)
  const found: string[] = []
  for (const one of source.statements) {
    if (ts.isImportDeclaration(one)) {
      if (erasedImport(one.importClause) || !ts.isStringLiteral(one.moduleSpecifier)) continue
      found.push(one.moduleSpecifier.text)
      continue
    }
    if (!ts.isExportDeclaration(one)) continue
    const said = one.moduleSpecifier
    if (said === undefined || !ts.isStringLiteral(said) || erasedExport(one)) continue
    found.push(said.text)
  }
  return found
}

export function reachingIn(leaving: Leaving): ReadonlyMap<string, readonly string[]> {
  const held = new Set(
    leaving.changed.filter((one) => one.startsWith(INSIDE) && one.endsWith(ENDING))
  )
  const found = new Map<string, readonly string[]>()
  for (const path of [...held].sort()) {
    const text = textIn(leaving, path)
    if (text === null) {
      found.set(path, [])
      continue
    }
    const outs: string[] = []
    for (const one of reachedIn(path, text)) {
      const landed = landingOf(path, one)
      if (landed === null || !held.has(landed) || outs.includes(landed)) continue
      outs.push(landed)
    }
    found.set(path, outs)
  }
  return found
}

export function cyclesIn(
  reaching: ReadonlyMap<string, readonly string[]>
): readonly (readonly string[])[] {
  let counted = 0
  const index = new Map<string, number>()
  const low = new Map<string, number>()
  const standing = new Set<string>()
  const stack: string[] = []
  const found: string[][] = []
  const walk = (at: string): undefined => {
    index.set(at, counted)
    low.set(at, counted)
    counted += 1
    stack.push(at)
    standing.add(at)
    for (const next of reaching.get(at) ?? []) {
      if (!index.has(next)) {
        walk(next)
        low.set(at, Math.min(low.get(at) ?? 0, low.get(next) ?? 0))
        continue
      }
      if (standing.has(next)) low.set(at, Math.min(low.get(at) ?? 0, index.get(next) ?? 0))
    }
    if (low.get(at) !== index.get(at)) return
    const held: string[] = []
    let said: string | undefined
    do {
      said = stack.pop()
      if (said === undefined) break
      standing.delete(said)
      held.push(said)
    } while (said !== at)
    if (held.length > 1 || (reaching.get(at) ?? []).includes(at)) found.push([...held].sort())
  }
  for (const at of [...reaching.keys()].sort()) if (!index.has(at)) walk(at)
  return found
}

export function reasonFor(at: string, held: readonly string[]): string {
  const others = held.filter((one) => one !== at)
  if (others.length === 0) return `imports itself — ${ITSELF}`
  const first = others
    .slice(0, SHOWN)
    .map((one) => `\`${one}\``)
    .join(", ")
  const rest = others.length > SHOWN ? `, and ${others.length - SHOWN} more` : ""
  return `stands in a cycle reaching ${first}${rest} — ${ITSELF}`
}

export function noImportCycle(leaving: Leaving): readonly Judged[] {
  const said: Judged[] = []
  for (const held of cyclesIn(reachingIn(leaving))) {
    for (const path of held) said.push({ path, reason: reasonFor(path, held) })
  }
  return said.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
