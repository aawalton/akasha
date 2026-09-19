import { dirname } from "node:path"
import type {
  Places,
  Placing,
} from "akasha/check/code/pages/identifier-matches-its-place/modules/place-reading/place-reading.module.code.ts"
import {
  lineOf,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const UNDER = "_"

const DECLARED = ".d.ts"

const DRAWN = ".tsx"

const CODE = "code"

const OPENING = /^[A-Z]/

const THROUGH = 1

const JOINING = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
])

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
  return `${said}, which is not written in \`${placing.nameFormat}\``
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

function drawing(node: ts.Node): boolean {
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

function nulled(node: ts.Expression): boolean {
  return heldIn(node).kind === ts.SyntaxKind.NullKeyword
}

function answersNull(node: ts.Node): boolean {
  const working = workingIn(node)
  if (working === null) return false
  if (!ts.isBlock(working.body)) return nulled(working.body as ts.Expression)
  let found = false
  let other = false
  const walk = (each: ts.Node): undefined => {
    if (ts.isFunctionLike(each)) return
    if (ts.isReturnStatement(each)) {
      if (each.expression === undefined) return
      if (nulled(each.expression)) found = true
      else other = true
      return
    }
    ts.forEachChild(each, walk)
  }
  walk(working.body)
  return found && !other
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

function pageValueIn(at: string): string | null {
  const said = partedIn(at)
  if (said === null) return null
  if (said.sections.length === 0) return exportedAs(said.slug)
  return exportedAs([said.slug, said.pageType, ...said.sections].join("-"))
}

function constantsIn(source: ts.SourceFile, at: string): readonly ts.Identifier[] {
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

function typedIn(source: ts.SourceFile): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of source.statements) {
    if (ts.isTypeAliasDeclaration(one) || ts.isInterfaceDeclaration(one)) found.add(one.name.text)
  }
  return found
}

function declaring(at: string): boolean {
  return at.endsWith(DECLARED)
}

function isExported(node: ts.Node): boolean {
  const held = ts.isVariableDeclaration(node) ? node.parent.parent : node
  const modifiers = ts.canHaveModifiers(held) ? ts.getModifiers(held) : undefined
  if (modifiers === undefined) return false
  for (const one of modifiers) {
    if (one.kind === ts.SyntaxKind.ExportKeyword) return true
  }
  return false
}

function stating(node: ts.Node): boolean {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  if (modifiers !== undefined) {
    for (const one of modifiers) {
      if (one.kind === ts.SyntaxKind.DeclareKeyword) return true
    }
  }
  return ts.isFunctionDeclaration(node) && node.body === undefined
}

export function refusedIn(at: string, text: string, places: Places): readonly string[] {
  if (declaring(at)) return []
  const source = parsedAs(at, text)
  const typed = typedIn(source)
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
  const drawnIn = at.endsWith(DRAWN)
  const fixedHere = places.fixed.get(dirname(at))
  const parted = partedIn(at)
  const loadedHere =
    parted === null || parted.sections.length !== 1 || parted.sections[0] !== CODE
      ? undefined
      : places.loaded.get(parted.pageType)
  const fixedAs = (held: string): boolean => held === fixedHere || loadedHere?.has(held) === true
  const alsoAType = (name: ts.Identifier, holding: ts.Node | null): boolean =>
    holding === null && typed.has(name.text)
  const taking = (
    name: ts.Identifier,
    held: ts.Node,
    scope: ts.Node,
    declared: ts.Node
  ): undefined => {
    if (fixedAs(name.text)) return
    if (openedAsATag(scope, name.text)) {
      return take(name, "component", places.componentIdentifier)
    }
    if (drawing(held) && OPENING.test(name.text)) {
      return take(name, "component", places.componentIdentifier)
    }
    if (drawnIn && OPENING.test(name.text) && isExported(declared) && answersNull(held)) {
      return take(name, "component", places.componentIdentifier)
    }
    return take(name, "function", places.functionIdentifier)
  }
  const walk = (node: ts.Node, holding: ts.Node | null): undefined => {
    if (stating(node)) return
    if (ts.isTypeAliasDeclaration(node)) take(node.name, "type", places.typeIdentifier)
    if (ts.isInterfaceDeclaration(node)) take(node.name, "interface", places.typeIdentifier)
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      if (!alsoAType(node.name, holding)) taking(node.name, node, holding ?? source, node)
    }
    if (ts.isVariableDeclaration(node)) {
      const bound = node.initializer
      if (ts.isIdentifier(node.name) && bound !== undefined && boundToAFunction(node)) {
        if (!alsoAType(node.name, holding)) taking(node.name, bound, holding ?? source, node)
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
  for (const one of constantsIn(source, at)) {
    if (fixedAs(one.text) || typed.has(one.text)) continue
    take(one, "constant", places.constantIdentifier)
  }
  return found
}
