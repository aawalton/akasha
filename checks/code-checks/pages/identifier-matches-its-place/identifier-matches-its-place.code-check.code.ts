import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import type { Answering } from "@akasha/indexes/answering"
import { matchingIn } from "@akasha/pages-system/name-format/format-reaching"
import type { Matching } from "@akasha/pages-system/name-format/name-matching"
import { componentIdentifier } from "@akasha/pages-system/name-place/component-identifier"
import { constantIdentifier } from "@akasha/pages-system/name-place/constant-identifier"
import { derivedIdentifier } from "@akasha/pages-system/name-place/derived-identifier"
import { functionIdentifier } from "@akasha/pages-system/name-place/function-identifier"
import { typeIdentifier } from "@akasha/pages-system/name-place/type-identifier"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"
import ts from "typescript"
import {
  bodyOf,
  input,
  overEachFile,
  TEXTS,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Running } from "../../../modules/judging/judging.module.code.ts"

const UNDER = "_"

const DECLARED = ".d.ts"

const OPENING = /^[A-Z]/

const THROUGH = 1

const JOINING = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
])

export type Placing = {
  readonly nameFormatSlug: string
  readonly matching: Matching
}

export type Places = {
  readonly typeIdentifier: Placing
  readonly functionIdentifier: Placing
  readonly componentIdentifier: Placing
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

function drawn(node: ts.Expression, through: number): boolean {
  const held = heldIn(node)
  if (ts.isJsxElement(held) || ts.isJsxSelfClosingElement(held) || ts.isJsxFragment(held)) {
    return true
  }
  if (ts.isParenthesizedExpression(held)) return drawn(held.expression, through)
  if (ts.isConditionalExpression(held)) {
    return drawn(held.whenTrue, through) || drawn(held.whenFalse, through)
  }
  if (ts.isBinaryExpression(held) && JOINING.has(held.operatorToken.kind)) {
    return drawn(held.left, through) || drawn(held.right, through)
  }
  if (ts.isArrayLiteralExpression(held)) {
    return held.elements.some((one) => drawn(one, through))
  }
  if (ts.isCallExpression(held) && through > 0) {
    return held.arguments.some((one) => drawn(one, through - 1))
  }
  return false
}

export function drawing(node: ts.Node): boolean {
  const working = workingIn(node)
  if (working === null) return false
  if (!ts.isBlock(working.body)) return drawn(working.body as ts.Expression, THROUGH)
  let found = false
  const walk = (each: ts.Node): undefined => {
    if (found || ts.isFunctionLike(each)) return
    if (ts.isReturnStatement(each)) {
      if (each.expression !== undefined && drawn(each.expression, THROUGH)) found = true
      return
    }
    ts.forEachChild(each, walk)
  }
  walk(working.body)
  return found
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

function openedAsATag(scope: ts.Node, text: string): boolean {
  if (!OPENING.test(text)) return false
  let found = false
  const walk = (node: ts.Node): undefined => {
    if (found) return
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName
      if (ts.isIdentifier(tag) && tag.text === text) {
        found = true
        return
      }
    }
    ts.forEachChild(node, walk)
  }
  walk(scope)
  return found
}

export function pageValueIn(at: string): string | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0) return null
  return exportedAs(said.slug)
}

export function constantsIn(source: ts.SourceFile, at: string): readonly ts.Identifier[] {
  const itself = pageValueIn(at)
  const found: ts.Identifier[] = []
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    const holding = statement.declarationList
    if ((holding.flags & ts.NodeFlags.BlockScoped) !== ts.NodeFlags.Const) continue
    for (const one of holding.declarations) {
      if (!ts.isIdentifier(one.name) || one.name.text === itself) continue
      if (one.initializer === undefined) continue
      if (writtenOut(heldIn(one.initializer))) found.push(one.name)
    }
  }
  return found
}

export function declaring(at: string): boolean {
  return at.endsWith(DECLARED)
}

export function refusedIn(at: string, text: string, places: Places): readonly string[] {
  if (declaring(at)) return []
  const source = parsedAs(at, text)
  const found: string[] = []
  const take = (name: ts.Identifier, kind: string, placing: Placing): undefined => {
    const said = refusalAt(source, name, kind, placing)
    if (said !== null) found.push(said)
  }
  const placedIn = (name: ts.Identifier, kind: string, scope: ts.Node): undefined => {
    if (openedAsATag(scope, name.text)) return take(name, "component", places.componentIdentifier)
    return take(name, kind, places.derivedIdentifier)
  }
  const eachIn = (name: ts.BindingName, scope: ts.Node): undefined => {
    for (const one of namesIn(name)) placedIn(one, "name", scope)
  }
  const taking = (name: ts.Identifier, held: ts.Node, scope: ts.Node): undefined => {
    if (drawing(held) || openedAsATag(scope, name.text)) {
      return take(name, "component", places.componentIdentifier)
    }
    return take(name, "function", places.functionIdentifier)
  }
  const walk = (node: ts.Node, holding: ts.Node | null): undefined => {
    if (ts.isTypeAliasDeclaration(node)) take(node.name, "type", places.typeIdentifier)
    if (ts.isInterfaceDeclaration(node)) take(node.name, "interface", places.typeIdentifier)
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      taking(node.name, node, holding ?? source)
    }
    if (ts.isVariableDeclaration(node)) {
      const bound = node.initializer
      if (ts.isIdentifier(node.name) && bound !== undefined && boundToAFunction(node)) {
        taking(node.name, bound, holding ?? source)
      } else if (holding !== null && !ts.isCatchClause(node.parent)) {
        eachIn(node.name, holding)
      }
    }
    if (ts.isCatchClause(node) && node.variableDeclaration !== undefined) {
      eachIn(node.variableDeclaration.name, holding ?? source)
    }
    const working = workingIn(node)
    if (working === null) {
      ts.forEachChild(node, (each) => walk(each, holding))
      return
    }
    for (const one of working.parameters) {
      for (const name of namesIn(one.name)) {
        if (name.text.startsWith(UNDER) && !readIn(working.body, name.text)) continue
        placedIn(name, "parameter", working.body)
      }
    }
    ts.forEachChild(node, (each) => walk(each, each === working.body ? working.body : holding))
  }
  ts.forEachChild(source, (each) => walk(each, null))
  for (const one of constantsIn(source, at)) take(one, "constant", places.constantIdentifier)
  return found
}

export function placesIn(
  root: string,
  index: Answering,
  codeAt: (path: string) => string | null = (path) => path
): Places {
  const formatting = matchingIn(root, index, codeAt)
  const held = (nameFormatSlug: string): Placing => ({
    nameFormatSlug,
    matching: formatting(nameFormatSlug),
  })
  return {
    typeIdentifier: held(typeIdentifier.nameFormatSlug),
    functionIdentifier: held(functionIdentifier.nameFormatSlug),
    componentIdentifier: held(componentIdentifier.nameFormatSlug),
    constantIdentifier: held(constantIdentifier.nameFormatSlug),
    derivedIdentifier: held(derivedIdentifier.nameFormatSlug),
  }
}

const refusalsIn: Running = (change, shadow) => {
  const wanted = change.changed.some((one) => textNamed(one))
  if (!wanted) return []
  const places = placesIn(change.root, shadow.index, shadow.codeAt)
  return overEachFile(change, (given) => {
    if (!textNamed(given.path)) return []
    return refusedIn(given.path, bodyOf(given), places)
  })
}

export const identifierMatchesItsPlace = input(TEXTS, refusalsIn)
