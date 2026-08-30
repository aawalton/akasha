import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { matchingIn } from "../../../pages-system/name-format/format-reaching/format-reaching.module.code.ts"
import type { Matching } from "../../../pages-system/name-format/name-matching/name-matching.module.code.ts"
import { constantIdentifier } from "../../../pages-system/name-place/name-places/constant-identifier.name-place.ts"
import { functionIdentifier } from "../../../pages-system/name-place/name-places/function-identifier.name-place.ts"
import { typeIdentifier } from "../../../pages-system/name-place/name-places/type-identifier.name-place.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { bodyOf, overEachFile, type Running } from "../../checking/checking.module.code.ts"

const INSIDE = "akasha/"

const ENDING = ".ts"

export type Placing = {
  readonly nameFormatSlug: string
  readonly matching: Matching
}

export type Places = {
  readonly typeIdentifier: Placing
  readonly functionIdentifier: Placing
  readonly constantIdentifier: Placing
}

function refusalAt(
  source: ts.SourceFile,
  name: ts.Identifier,
  kind: string,
  placing: Placing
): string | null {
  if (placing.matching(name.text)) return null
  const line = lineOf(source, name)
  const said = `line ${line} declares the ${kind} \`${name.text}\``
  return `${said}, which is not written in \`${placing.nameFormatSlug}\``
}

function boundToAFunction(node: ts.VariableDeclaration): boolean {
  const held = node.initializer
  if (held === undefined) return false
  return ts.isArrowFunction(held) || ts.isFunctionExpression(held)
}

function heldIn(node: ts.Expression): ts.Expression {
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return heldIn(node.expression)
  return node
}

function writtenOut(node: ts.Expression): boolean {
  return (
    ts.isObjectLiteralExpression(node) ||
    ts.isArrayLiteralExpression(node) ||
    ts.isStringLiteral(node) ||
    ts.isNumericLiteral(node) ||
    ts.isRegularExpressionLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword
  )
}

export function pageValueIn(at: string): string | null {
  const said = namedIn(at)
  return said === null ? null : exportedAs(said.stem)
}

export function constantsIn(source: ts.SourceFile, at: string): readonly ts.Identifier[] {
  const itself = pageValueIn(at)
  const found: ts.Identifier[] = []
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (!ts.isIdentifier(one.name) || one.name.text === itself) continue
      if (one.initializer === undefined) continue
      if (writtenOut(heldIn(one.initializer))) found.push(one.name)
    }
  }
  return found
}

export function refusedIn(at: string, text: string, places: Places): readonly string[] {
  const source = parsedAs(at, text)
  const found: string[] = []
  const take = (name: ts.Identifier, kind: string, placing: Placing): undefined => {
    const said = refusalAt(source, name, kind, placing)
    if (said !== null) found.push(said)
  }
  const walk = (node: ts.Node): undefined => {
    if (ts.isTypeAliasDeclaration(node)) take(node.name, "type", places.typeIdentifier)
    if (ts.isInterfaceDeclaration(node)) take(node.name, "interface", places.typeIdentifier)
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      take(node.name, "function", places.functionIdentifier)
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && boundToAFunction(node)) {
      take(node.name, "function", places.functionIdentifier)
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  for (const one of constantsIn(source, at)) take(one, "constant", places.constantIdentifier)
  return found
}

export function placesIn(root: string): Places {
  const formatting = matchingIn(root)
  const held = (nameFormatSlug: string): Placing => ({
    nameFormatSlug,
    matching: formatting(nameFormatSlug),
  })
  return {
    typeIdentifier: held(typeIdentifier.nameFormatSlug),
    functionIdentifier: held(functionIdentifier.nameFormatSlug),
    constantIdentifier: held(constantIdentifier.nameFormatSlug),
  }
}

export const identifierMatchesItsPlace: Running = (leaving) => {
  const wanted = leaving.changed.some((one) => one.startsWith(INSIDE) && one.endsWith(ENDING))
  if (!wanted) return []
  const places = placesIn(leaving.root)
  return overEachFile(leaving, (given) => {
    if (!given.path.startsWith(INSIDE) || !given.path.endsWith(ENDING)) return []
    const text = bodyOf(given)
    return text === null ? [] : refusedIn(given.path, text, places)
  })
}
