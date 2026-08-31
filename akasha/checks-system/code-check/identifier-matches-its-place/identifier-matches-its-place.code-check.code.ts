import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { matchingIn } from "../../../pages-system/name-format/format-reaching/format-reaching.module.code.ts"
import type { Matching } from "../../../pages-system/name-format/name-matching/name-matching.module.code.ts"
import { constantIdentifier } from "../../../pages-system/name-place/name-places/constant-identifier.name-place.ts"
import { derivedIdentifier } from "../../../pages-system/name-place/name-places/derived-identifier.name-place.ts"
import { functionIdentifier } from "../../../pages-system/name-place/name-places/function-identifier.name-place.ts"
import { typeIdentifier } from "../../../pages-system/name-place/name-places/type-identifier.name-place.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import {
  bodyOf,
  overEachFile,
  TEXTS,
  waking,
} from "../../change-walking/change-walking.module.code.ts"
import type { Running } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

const ENDING = ".ts"

const UNDER = "_"

export type Placing = {
  readonly nameFormatSlug: string
  readonly matching: Matching
}

export type Places = {
  readonly typeIdentifier: Placing
  readonly functionIdentifier: Placing
  readonly constantIdentifier: Placing
  readonly derivedIdentifier: Placing
}

type Working = {
  readonly parameters: readonly ts.ParameterDeclaration[]
  readonly body: ts.Node
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

function namesIn(name: ts.BindingName): readonly ts.Identifier[] {
  if (ts.isIdentifier(name)) return [name]
  const found: ts.Identifier[] = []
  for (const one of name.elements) {
    if (ts.isOmittedExpression(one)) continue
    for (const each of namesIn(one.name)) found.push(each)
  }
  return found
}

function workingIn(node: ts.Node): Working | null {
  if (!ts.isFunctionLike(node)) return null
  const held = node as ts.FunctionLikeDeclaration
  const body = held.body
  if (body === undefined) return null
  return { parameters: held.parameters, body }
}

function keyed(node: ts.Identifier): boolean {
  const held = node.parent
  if (ts.isPropertyAccessExpression(held) && held.name === node) return true
  if (ts.isQualifiedName(held) && held.right === node) return true
  if (ts.isPropertyAssignment(held) && held.name === node) return true
  if (ts.isBindingElement(held) && held.propertyName === node) return true
  return false
}

function readIn(body: ts.Node, text: string): boolean {
  let found = false
  const walk = (node: ts.Node): undefined => {
    if (found) return
    if (ts.isIdentifier(node) && node.text === text && !keyed(node)) {
      found = true
      return
    }
    ts.forEachChild(node, walk)
  }
  walk(body)
  return found
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
  const eachIn = (name: ts.BindingName): undefined => {
    for (const one of namesIn(name)) take(one, "name", places.derivedIdentifier)
  }
  const walk = (node: ts.Node, inside: boolean): undefined => {
    if (ts.isTypeAliasDeclaration(node)) take(node.name, "type", places.typeIdentifier)
    if (ts.isInterfaceDeclaration(node)) take(node.name, "interface", places.typeIdentifier)
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      take(node.name, "function", places.functionIdentifier)
    }
    if (ts.isVariableDeclaration(node)) {
      if (ts.isIdentifier(node.name) && boundToAFunction(node)) {
        take(node.name, "function", places.functionIdentifier)
      } else if (inside && !ts.isCatchClause(node.parent)) {
        eachIn(node.name)
      }
    }
    if (ts.isCatchClause(node) && node.variableDeclaration !== undefined) {
      eachIn(node.variableDeclaration.name)
    }
    const working = workingIn(node)
    if (working === null) {
      ts.forEachChild(node, (each) => walk(each, inside))
      return
    }
    for (const one of working.parameters) {
      for (const name of namesIn(one.name)) {
        if (name.text.startsWith(UNDER) && !readIn(working.body, name.text)) continue
        take(name, "parameter", places.derivedIdentifier)
      }
    }
    ts.forEachChild(node, (each) => walk(each, each === working.body ? true : inside))
  }
  ts.forEachChild(source, (each) => walk(each, false))
  for (const one of constantsIn(source, at)) take(one, "constant", places.constantIdentifier)
  return found
}

export function placesIn(
  root: string,
  codeAt: (path: string) => string | null = (path) => path
): Places {
  const formatting = matchingIn(root, codeAt)
  const held = (nameFormatSlug: string): Placing => ({
    nameFormatSlug,
    matching: formatting(nameFormatSlug),
  })
  return {
    typeIdentifier: held(typeIdentifier.nameFormatSlug),
    functionIdentifier: held(functionIdentifier.nameFormatSlug),
    constantIdentifier: held(constantIdentifier.nameFormatSlug),
    derivedIdentifier: held(derivedIdentifier.nameFormatSlug),
  }
}

const refusalsIn: Running = (change, shadow) => {
  const wanted = change.changed.some((one) => one.startsWith(INSIDE) && one.endsWith(ENDING))
  if (!wanted) return []
  const places = placesIn(change.root, shadow.codeAt)
  return overEachFile(change, (given) => {
    if (!given.path.startsWith(INSIDE) || !given.path.endsWith(ENDING)) return []
    return refusedIn(given.path, bodyOf(given), places)
  })
}

export const identifierMatchesItsPlace = waking(TEXTS, refusalsIn)
