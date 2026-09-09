import { lineOf, parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  judgingEach,
  overEachText,
  textsBy,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import { valueImportsIn } from "../calculation-imports-only-types/calculation-imports-only-types.code-check.decision.code.ts"

const DECLARING = ".types.ts"

const ONLY = "a types file states declarations alone, and nothing in a types file runs"

const LET_THROUGH = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.InterfaceDeclaration,
])

const CALLED = new Map<ts.SyntaxKind, string>([
  [ts.SyntaxKind.ClassDeclaration, "a class"],
  [ts.SyntaxKind.EnumDeclaration, "an enum"],
  [ts.SyntaxKind.ExportAssignment, "an export of a value"],
  [ts.SyntaxKind.ExportDeclaration, "an export that is not marked `type`"],
  [ts.SyntaxKind.ExpressionStatement, "an expression run for what running it does"],
  [ts.SyntaxKind.FunctionDeclaration, "a function"],
  [ts.SyntaxKind.ModuleDeclaration, "a namespace"],
  [ts.SyntaxKind.VariableStatement, "a variable"],
])

export type Found = {
  readonly line: number
  readonly called: string
}

function letThrough(one: ts.Statement): boolean {
  if (LET_THROUGH.has(one.kind)) return true
  if (ts.isImportDeclaration(one)) return true
  return ts.isExportDeclaration(one) && one.isTypeOnly
}

function calledFor(one: ts.Statement): string {
  return CALLED.get(one.kind) ?? "a statement"
}

function loadedIn(at: string, text: string): readonly Found[] {
  return valueImportsIn(at, text).map((one) => ({
    line: one.line,
    called:
      one.named === null
        ? `\`${one.from}\`, loaded for what loading \`${one.from}\` does`
        : `\`${one.named}\`, loaded from \`${one.from}\` as a value`,
  }))
}

export function whatRunsIn(at: string, text: string): readonly Found[] {
  const source = parsedAs(at, text)
  const found: Found[] = [...loadedIn(at, text)]
  for (const one of source.statements) {
    if (letThrough(one)) continue
    found.push({ line: lineOf(source, one), called: calledFor(one) })
  }
  return [...found].sort((one, two) => one.line - two.line)
}

function reasonFor(one: Found): string {
  return `line ${one.line} carries ${one.called} — ${ONLY}`
}

function declaring(path: string): boolean {
  return path.endsWith(DECLARING)
}

function refusedIn(path: string, text: string): readonly string[] {
  if (!declaring(path)) return []
  return whatRunsIn(path, text).map(reasonFor)
}

export const reasonsIn = overEachText(refusedIn)

const TYPES_FILES = textsBy("types files", declaring)

export const typesFileRunsNothing = judgingEach(TYPES_FILES, (given) =>
  refusedIn(given.path, given.text)
)
