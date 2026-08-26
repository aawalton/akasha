import * as ts from "typescript"
import type { TransformationContext } from "../../context/transformation-context"
import * as extensions from "../../utils/language-extensions"
import {
  getExtensionKindForNode,
  getIterableExtensionKindForNode,
  IterableExtensionKind,
} from "../../utils/language-extensions"
import { findFirstNonOuterParent } from "../../utils/typescript/typescript"
import { findFirstNodeAbove } from "../../utils/typescript/find-first-node-above"

const multiReturnExtensionName = "__tstlMultiReturn"
export function isMultiReturnType(type: ts.Type): boolean {
  return type.getProperty(multiReturnExtensionName) !== undefined
}

export function canBeMultiReturnType(type: ts.Type): boolean {
  return (
    (type.flags & ts.TypeFlags.Any) !== 0 ||
    isMultiReturnType(type) ||
    (type.isUnion() && type.types.some((t) => canBeMultiReturnType(t)))
  )
}

export function isMultiFunctionCall(
  context: TransformationContext,
  expression: ts.CallExpression
): boolean {
  return isMultiFunctionNode(context, expression.expression)
}

export function returnsMultiType(context: TransformationContext, node: ts.CallExpression): boolean {
  const signature = context.checker.getResolvedSignature(node)
  const type = signature?.getReturnType()
  return type ? isMultiReturnType(type) : false
}

export function isMultiReturnCall(context: TransformationContext, expression: ts.Expression) {
  return ts.isCallExpression(expression) && returnsMultiType(context, expression)
}

export function isMultiFunctionNode(context: TransformationContext, node: ts.Node): boolean {
  return (
    ts.isIdentifier(node) &&
    node.text === "$multi" &&
    getExtensionKindForNode(context, node) === extensions.ExtensionKind.MultiFunction
  )
}

export function isInMultiReturnFunction(context: TransformationContext, node: ts.Node) {
  const declaration = findFirstNodeAbove(node, ts.isFunctionLike)
  if (!declaration) {
    return false
  }
  const signature = context.checker.getSignatureFromDeclaration(declaration)
  const type = signature?.getReturnType()
  return type ? isMultiReturnType(type) : false
}

export function shouldMultiReturnCallBeWrapped(
  context: TransformationContext,
  node: ts.CallExpression
) {
  if (!returnsMultiType(context, node)) {
    return false
  }

  const parent = findFirstNonOuterParent(node)

  if (ts.isVariableDeclaration(parent) && ts.isArrayBindingPattern(parent.name)) {
    return false
  }

  if (
    ts.isBinaryExpression(parent) &&
    parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    ts.isArrayLiteralExpression(parent.left)
  ) {
    return false
  }

  if (ts.isSpreadElement(parent)) {
    return false
  }

  if (ts.isExpressionStatement(parent)) {
    return false
  }

  if (
    (ts.isReturnStatement(parent) || ts.isArrowFunction(parent)) &&
    isInMultiReturnFunction(context, node)
  ) {
    return false
  }

  if (ts.isElementAccessExpression(parent)) {
    return false
  }

  if (
    ts.isForOfStatement(parent) &&
    getIterableExtensionKindForNode(context, node) === IterableExtensionKind.Iterable
  ) {
    return false
  }

  return true
}
