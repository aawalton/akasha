import { lineOf, parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { overEachText } from "../../../modules/change-walking/change-walking.module.code.ts"

const ONLY = "a file inside akasha exports only the names it declared itself"

type Found = {
  readonly named: string | null
  readonly line: number
  readonly from: string
}

function cameIn(source: ts.SourceFile): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const took = (one: ts.Node): undefined => {
    if (!ts.isImportDeclaration(one) || !ts.isStringLiteral(one.moduleSpecifier)) return
    const clause = one.importClause
    if (clause === undefined) return
    const at = one.moduleSpecifier.text
    if (clause.name !== undefined) found.set(clause.name.text, at)
    const bound = clause.namedBindings
    if (bound === undefined) return
    if (ts.isNamespaceImport(bound)) found.set(bound.name.text, at)
    else for (const each of bound.elements) found.set(each.name.text, at)
  }
  const held = (one: ts.Node): undefined => {
    took(one)
    ts.forEachChild(one, held)
  }
  ts.forEachChild(source, held)
  return found
}

function sentOn(
  clause: ts.NamedExportBindings | undefined,
  at: string,
  line: number
): readonly Found[] {
  if (clause === undefined) return [{ named: null, line, from: at }]
  if (ts.isNamespaceExport(clause)) return [{ named: clause.name.text, line, from: at }]
  return clause.elements.map((each) => ({ named: each.name.text, line, from: at }))
}

export function reExportsIn(at: string, text: string): readonly Found[] {
  const source = parsedAs(at, text)
  const came = cameIn(source)
  const found: Found[] = []
  const took = (one: ts.Node): undefined => {
    if (ts.isExportAssignment(one) && ts.isIdentifier(one.expression)) {
      const from = came.get(one.expression.text)
      if (from === undefined) return
      found.push({ named: one.expression.text, line: lineOf(source, one), from })
      return
    }
    if (!ts.isExportDeclaration(one)) return
    const line = lineOf(source, one)
    const said = one.moduleSpecifier
    if (said !== undefined && ts.isStringLiteral(said)) {
      found.push(...sentOn(one.exportClause, said.text, line))
      return
    }
    const clause = one.exportClause
    if (clause === undefined || !ts.isNamedExports(clause)) return
    for (const each of clause.elements) {
      const from = came.get((each.propertyName ?? each.name).text)
      if (from !== undefined) found.push({ named: each.name.text, line, from })
    }
  }
  const held = (one: ts.Node): undefined => {
    took(one)
    ts.forEachChild(one, held)
  }
  ts.forEachChild(source, held)
  return found
}

function reasonFor(one: Found): string {
  if (one.named === null) {
    return `line ${one.line} sends on everything \`${one.from}\` exports — ${ONLY}`
  }
  return `line ${one.line} sends on \`${one.named}\`, which came from \`${one.from}\` — ${ONLY}`
}

export function refusalsIn(path: string, text: string): readonly string[] {
  return reExportsIn(path, text).map(reasonFor)
}

export const reasonsIn = overEachText(refusalsIn)
