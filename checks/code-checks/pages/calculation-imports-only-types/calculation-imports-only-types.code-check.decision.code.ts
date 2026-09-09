import { lineOf, parsedAs } from "@akasha/code/code-source"
import ts from "typescript"

const CALCULATED = ".computed-property.code.ts"

const SHARED = ".computed-property-module.code.ts"

const ONLY =
  "a calculation runs from its text, and only a computed-property-module folds into that text"

type Found = {
  readonly named: string | null
  readonly line: number
  readonly from: string
}

function boundIn(bound: ts.NamedImportBindings, line: number, from: string): readonly Found[] {
  if (ts.isNamespaceImport(bound)) return [{ named: bound.name.text, line, from }]
  if (from.endsWith(SHARED)) return []
  return bound.elements
    .filter((each) => !each.isTypeOnly)
    .map((each) => ({ named: each.name.text, line, from }))
}

export function valueImportsIn(at: string, text: string): readonly Found[] {
  const source = parsedAs(at, text)
  const found: Found[] = []
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one) || !ts.isStringLiteral(one.moduleSpecifier)) continue
    const from = one.moduleSpecifier.text
    const line = lineOf(source, one)
    const clause = one.importClause
    if (clause === undefined) {
      found.push({ named: null, line, from })
      continue
    }
    if (clause.isTypeOnly) continue
    if (clause.name !== undefined) found.push({ named: clause.name.text, line, from })
    const bound = clause.namedBindings
    if (bound !== undefined) found.push(...boundIn(bound, line, from))
  }
  return found
}

function reasonFor(one: Found): string {
  if (one.named === null) {
    return `line ${one.line} brings in \`${one.from}\` for its side effect — ${ONLY}`
  }
  return `line ${one.line} imports \`${one.named}\` from \`${one.from}\` as a value — ${ONLY}`
}

export function runsFromText(path: string): boolean {
  return path.endsWith(CALCULATED) || path.endsWith(SHARED)
}

export function foundIn(path: string, text: string): readonly string[] {
  if (!runsFromText(path)) return []
  return valueImportsIn(path, text).map(reasonFor)
}
