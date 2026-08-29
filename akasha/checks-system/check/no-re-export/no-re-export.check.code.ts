import ts from "typescript"
import { judgingEachFile, overEachText } from "../../checking.module.code.ts"

const INSIDE = "akasha/"

const ONLY = "a file inside akasha exports only the names it declared itself"

type Found = {
  readonly named: string | null
  readonly line: number
  readonly from: string
}

function cameIn(source: ts.SourceFile): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one) || !ts.isStringLiteral(one.moduleSpecifier)) continue
    const clause = one.importClause
    if (clause === undefined) continue
    const at = one.moduleSpecifier.text
    if (clause.name !== undefined) found.set(clause.name.text, at)
    const bound = clause.namedBindings
    if (bound === undefined) continue
    if (ts.isNamespaceImport(bound)) found.set(bound.name.text, at)
    else for (const each of bound.elements) found.set(each.name.text, at)
  }
  return found
}

function sentOn(clause: ts.NamedExportBindings | undefined, at: string, line: number): Found[] {
  if (clause === undefined) return [{ named: null, line, from: at }]
  if (ts.isNamespaceExport(clause)) return [{ named: clause.name.text, line, from: at }]
  return clause.elements.map((each) => ({ named: each.name.text, line, from: at }))
}

export function reExportsIn(at: string, text: string): readonly Found[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const came = cameIn(source)
  const found: Found[] = []
  for (const one of source.statements) {
    const line = source.getLineAndCharacterOfPosition(one.getStart(source)).line + 1
    if (ts.isExportAssignment(one) && ts.isIdentifier(one.expression)) {
      const from = came.get(one.expression.text)
      if (from !== undefined) found.push({ named: one.expression.text, line, from })
      continue
    }
    if (!ts.isExportDeclaration(one)) continue
    const said = one.moduleSpecifier
    if (said !== undefined && ts.isStringLiteral(said)) {
      found.push(...sentOn(one.exportClause, said.text, line))
      continue
    }
    const clause = one.exportClause
    if (clause === undefined || !ts.isNamedExports(clause)) continue
    for (const each of clause.elements) {
      const from = came.get((each.propertyName ?? each.name).text)
      if (from !== undefined) found.push({ named: each.name.text, line, from })
    }
  }
  return found
}

function reasonFor(one: Found): string {
  if (one.named === null) {
    return `line ${one.line} sends on everything \`${one.from}\` exports — ${ONLY}`
  }
  return `line ${one.line} sends on \`${one.named}\`, which came from \`${one.from}\` — ${ONLY}`
}

function refusalsIn(path: string, text: string): readonly string[] {
  if (!path.startsWith(INSIDE)) return []
  return reExportsIn(path, text).map(reasonFor)
}

export const reasonsIn = overEachText(refusalsIn)

export const noReExport = judgingEachFile(reasonsIn)
