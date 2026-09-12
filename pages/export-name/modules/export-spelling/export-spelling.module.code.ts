import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import { exportedAs, typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const CODE = "code"

export type Spelling = { readonly at: string; readonly of: string; readonly to: string }

type Reading = (path: string) => string | null

type Naming = (at: string, text: string, named: string) => boolean

function exportsIt(one: ts.Statement): boolean {
  const shown = ts.canHaveModifiers(one) ? (ts.getModifiers(one) ?? []) : []
  return shown.some((each) => each.kind === ts.SyntaxKind.ExportKeyword)
}

export function typedIn(at: string, text: string, named: string): boolean {
  for (const one of parsedAs(at, text).statements) {
    if (!ts.isTypeAliasDeclaration(one) && !ts.isInterfaceDeclaration(one)) continue
    if (one.name.text === named && exportsIt(one)) return true
  }
  return false
}

function boundIn(one: ts.Statement, named: string): boolean {
  if (ts.isFunctionDeclaration(one)) return one.name?.text === named
  if (!ts.isVariableStatement(one)) return false
  return one.declarationList.declarations.some(
    (each) => ts.isIdentifier(each.name) && each.name.text === named
  )
}

export function calledIn(at: string, text: string, named: string): boolean {
  for (const one of parsedAs(at, text).statements) {
    if (!ts.isFunctionDeclaration(one) && !ts.isVariableStatement(one)) continue
    if (exportsIt(one) && boundIn(one, named)) return true
  }
  return false
}

function spelledAt(
  textOf: Reading,
  at: string | null,
  of: string,
  to: string,
  names: Naming
): readonly Spelling[] {
  if (at === null) return []
  const text = textOf(at)
  if (text === null || !text.includes(of)) return []
  if (!names(at, text, of)) return []
  return [{ at, of, to }]
}

export function spellingsIn(
  textOf: Reading,
  at: string,
  said: ReadonlyMap<string, string>,
  was: string,
  to: string
): readonly Spelling[] {
  const ending = said.get(CODE)
  return [
    ...spelledAt(textOf, at, typedAs(was), typedAs(to), typedIn),
    ...spelledAt(
      textOf,
      ending === undefined ? null : besideAt(at, CODE, ending),
      exportedAs(was),
      exportedAs(to),
      calledIn
    ),
  ]
}
