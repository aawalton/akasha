import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const CALCULATED = ".computed-property.code.ts"

const ONLY = "a calculation runs from its text alone, where nothing resolves an import"

type Found = {
  readonly named: string | null
  readonly line: number
  readonly from: string
}

function boundIn(bound: ts.NamedImportBindings, line: number, from: string): readonly Found[] {
  if (ts.isNamespaceImport(bound)) return [{ named: bound.name.text, line, from }]
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

function refusalsIn(path: string, text: string): readonly string[] {
  if (!path.endsWith(CALCULATED)) return []
  return valueImportsIn(path, text).map(reasonFor)
}

export const reasonsIn = overEachText(refusalsIn)

export const calculationImportsOnlyTypes = judgingEach(TEXTS, (given) =>
  refusalsIn(given.path, given.text)
)
