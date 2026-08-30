import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const CHANGERS = new Set([
  "add",
  "clear",
  "copyWithin",
  "delete",
  "fill",
  "pop",
  "push",
  "reverse",
  "set",
  "shift",
  "sort",
  "splice",
  "unshift",
])

const OPEN = new Set(["Array", "Map", "Set"])

const HELD = new Set(["ReadonlyArray", "ReadonlyMap", "ReadonlySet"])

const REACHED = "so whoever it is handed to can change it under the body that made it"

const MADE = "so this changes what it was handed rather than what it made"

function readonlyOperator(node: ts.Node): node is ts.TypeOperatorNode {
  return ts.isTypeOperatorNode(node) && node.operator === ts.SyntaxKind.ReadonlyKeyword
}

function namedAs(node: ts.TypeReferenceNode): string | null {
  return ts.isIdentifier(node.typeName) ? node.typeName.text : null
}

function openIn(node: ts.TypeNode): readonly ts.TypeNode[] {
  if (ts.isParenthesizedTypeNode(node)) return openIn(node.type)
  if (readonlyOperator(node)) {
    const inner = node.type
    if (ts.isArrayTypeNode(inner)) return openIn(inner.elementType)
    if (ts.isTupleTypeNode(inner)) return inner.elements.flatMap(openIn)
    return openIn(inner)
  }
  if (ts.isArrayTypeNode(node)) return [node, ...openIn(node.elementType)]
  if (ts.isTupleTypeNode(node)) return [node, ...node.elements.flatMap(openIn)]
  if (ts.isTypeReferenceNode(node)) {
    const said = namedAs(node)
    const inner = (node.typeArguments ?? []).flatMap(openIn)
    if (said !== null && OPEN.has(said)) return [node, ...inner]
    if (said !== null && HELD.has(said)) return inner
    return inner
  }
  if (ts.isRestTypeNode(node) || ts.isNamedTupleMember(node) || ts.isOptionalTypeNode(node)) {
    return openIn(node.type)
  }
  if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
    return node.types.flatMap(openIn)
  }
  if (ts.isTypeLiteralNode(node)) {
    return node.members.flatMap((one) =>
      ts.isPropertySignature(one) && one.type !== undefined ? openIn(one.type) : []
    )
  }
  if (ts.isFunctionTypeNode(node) || ts.isConstructorTypeNode(node)) {
    const taken = node.parameters.flatMap((one) => (one.type === undefined ? [] : openIn(one.type)))
    return node.type === undefined ? taken : [...taken, ...openIn(node.type)]
  }
  return []
}

function spellingOf(node: ts.TypeNode): string {
  if (ts.isArrayTypeNode(node)) return "`T[]`"
  if (ts.isTupleTypeNode(node)) return "a tuple"
  const said = ts.isTypeReferenceNode(node) ? namedAs(node) : null
  if (said === "Array") return "`Array<T>`"
  if (said === "Set") return "`Set<T>`"
  return "`Map<K, V>`"
}

function heldFormOf(node: ts.TypeNode): string {
  if (ts.isArrayTypeNode(node) || ts.isTupleTypeNode(node)) return "`readonly`"
  const said = ts.isTypeReferenceNode(node) ? namedAs(node) : null
  if (said === "Array") return "`ReadonlyArray`"
  if (said === "Set") return "`ReadonlySet`"
  return "`ReadonlyMap`"
}

function handedOutIn(source: ts.SourceFile): readonly ts.TypeNode[] {
  const found: ts.TypeNode[] = []
  const over = (type: ts.TypeNode | undefined): undefined => {
    if (type !== undefined) found.push(...openIn(type))
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isFunctionLike(node)) {
      for (const one of node.parameters) over(one.type)
      over(node.type)
    }
    if (ts.isTypeAliasDeclaration(node)) over(node.type)
    if (ts.isInterfaceDeclaration(node)) {
      for (const one of node.members) if (ts.isPropertySignature(one)) over(one.type)
    }
    if (ts.isPropertyDeclaration(node)) over(node.type)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

function fresh(node: ts.Expression | undefined): boolean {
  if (node === undefined) return true
  if (ts.isArrayLiteralExpression(node) || ts.isObjectLiteralExpression(node)) return true
  if (ts.isNewExpression(node)) return true
  if (node.kind === ts.SyntaxKind.NullKeyword) return true
  if (ts.isIdentifier(node) && node.text === "undefined") return true
  if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) return fresh(node.expression)
  if (ts.isConditionalExpression(node)) return fresh(node.whenTrue) && fresh(node.whenFalse)
  return false
}

function boundIn(body: ts.Node): ReadonlySet<string> {
  const made = new Set<string>()
  const taken = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isFunctionLike(node) && node !== body) {
      for (const one of node.parameters) if (ts.isIdentifier(one.name)) taken.add(one.name.text)
      return
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      if (fresh(node.initializer)) made.add(node.name.text)
      else taken.add(node.name.text)
    }
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isIdentifier(node.left) &&
      !fresh(node.right)
    ) {
      taken.add(node.left.text)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(body, visit)
  for (const one of taken) made.delete(one)
  return made
}

function rootOf(node: ts.Expression): ts.Expression {
  if (ts.isPropertyAccessExpression(node)) return rootOf(node.expression)
  if (ts.isParenthesizedExpression(node)) return rootOf(node.expression)
  if (ts.isNonNullExpression(node)) return rootOf(node.expression)
  return node
}

function madeBy(target: ts.Expression, made: ReadonlySet<string>): boolean {
  const root = rootOf(target)
  if (ts.isArrayLiteralExpression(root) || ts.isObjectLiteralExpression(root)) return true
  if (ts.isNewExpression(root)) return true
  return ts.isIdentifier(root) && made.has(root.text)
}

function changedIn(
  body: ts.Node,
  made: ReadonlySet<string>
): readonly ts.PropertyAccessExpression[] {
  const found: ts.PropertyAccessExpression[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isFunctionLike(node) && node !== body) {
      for (const one of changedIn(node, new Set([...made, ...boundIn(node)]))) found.push(one)
      return
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const called = node.expression
      if (CHANGERS.has(called.name.text) && !madeBy(called.expression, made)) found.push(called)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(body, visit)
  return found
}

export function noMutableCollection(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  for (const one of handedOutIn(standing.source)) {
    found.push({
      line: lineOf(standing.source, one),
      reason: `${spellingOf(one)} stands where it is handed out, ${REACHED}; write ${heldFormOf(one)}`,
    })
  }
  for (const one of changedIn(standing.source, boundIn(standing.source))) {
    found.push({
      line: lineOf(standing.source, one.name),
      reason: `\`.${one.name.text}\` changes a collection this body did not make, ${MADE}`,
    })
  }
  return [...found].sort((one, two) => one.line - two.line)
}
