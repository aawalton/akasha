import * as ts from "typescript"
import { SyntaxKind } from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import { assert } from "../../utils"
import { transformBuiltinPropertyAccessExpression } from "../builtins"
import type { TransformationContext } from "../context/transformation-context"
import type { FunctionVisitor } from "../context/visitors"
import { AnnotationKind, getTypeAnnotations } from "../utils/annotations"
import {
  invalidCallExtensionUse,
  invalidMultiReturnAccess,
  unsupportedOptionalCompileMembersOnly,
} from "../utils/diagnostics"
import { getSymbolExportScope, isSymbolExported } from "../utils/export"
import { createExportsIdentifier } from "../utils/exports-identifier"
import { getExtensionKindForNode } from "../utils/language-extensions"
import { addToNumericExpression } from "../utils/lua-ast"
import { transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { isOptionalContinuation } from "../utils/optional-chain-data"
import { maybeWrapThisVoidAsAdapter } from "../utils/this-void-adapter"
import { isArrayType, isNumberType, isStringType } from "../utils/typescript/typescript"
import { tryGetConstEnumValue } from "./enum"
import { getCustomNameFromSymbol } from "./identifier"
import { callExtensions } from "./language-extensions/call-extension"
import { isMultiReturnCall, returnsMultiType } from "./language-extensions/multi"
import { requireTransformOptionalChainWithCapture } from "./optional-chain-deps"
import { captureThisValue, type ExpressionWithThisValue } from "./this-value-capture"

function addOneToArrayAccessArgument(
  context: TransformationContext,
  node: ts.ElementAccessExpression,
  index: luaExpressions.Expression
): luaExpressions.Expression {
  const type = context.checker.getTypeAtLocation(node.expression)
  const argumentType = context.checker.getTypeAtLocation(node.argumentExpression)
  if (isArrayType(context, type) && isNumberType(context, argumentType)) {
    return addToNumericExpression(index, 1)
  }
  return index
}

export function transformElementAccessArgument(
  context: TransformationContext,
  node: ts.ElementAccessExpression
): luaExpressions.Expression {
  const index = context.transformExpression(node.argumentExpression)
  return addOneToArrayAccessArgument(context, node, index)
}

export const transformElementAccessExpression: FunctionVisitor<ts.ElementAccessExpression> = (
  node,
  context
) => {
  const expression = transformElementAccessExpressionWithCapture(context, node, undefined).expression
  if (ts.isOptionalChain(node)) return expression
  return maybeWrapThisVoidAsAdapter(context, node, expression, "fromType")
}
export function transformElementAccessExpressionWithCapture(
  context: TransformationContext,
  node: ts.ElementAccessExpression,
  thisValueCapture: luaExpressions.Identifier | undefined
): ExpressionWithThisValue {
  const constEnumValue = tryGetConstEnumValue(context, node)
  if (constEnumValue) {
    return { expression: constEnumValue }
  }

  if (ts.isOptionalChain(node)) {
    return requireTransformOptionalChainWithCapture()(context, node, thisValueCapture)
  }

  const [table, accessExpression] = context.transformOrderedExpressions([
    node.expression,
    node.argumentExpression,
  ])
  assert(table !== undefined && accessExpression !== undefined)

  const type = context.checker.getTypeAtLocation(node.expression)
  const argumentType = context.checker.getTypeAtLocation(node.argumentExpression)
  if (isStringType(context, type) && isNumberType(context, argumentType)) {
    return {
      expression: transformLuaLibFunction(
        context,
        LuaLibFeature.StringAccess,
        node,
        table,
        accessExpression
      ),
    }
  }

  const updatedAccessExpression = addOneToArrayAccessArgument(context, node, accessExpression)

  if (isMultiReturnCall(context, node.expression)) {
    const accessType = context.checker.getTypeAtLocation(node.argumentExpression)
    if (!isNumberType(context, accessType)) {
      context.addDiagnostic(invalidMultiReturnAccess(node))
    }

    const canOmitSelect =
      ts.isNumericLiteral(node.argumentExpression) && node.argumentExpression.text === "0"
    if (canOmitSelect) {
      return { expression: luaExpressions.createParenthesizedExpression(table) }
    }

    const selectIdentifier = luaExpressions.createIdentifier("select")
    return {
      expression: luaExpressions.createCallExpression(selectIdentifier, [updatedAccessExpression, table]),
    }
  }

  if (thisValueCapture) {
    const thisValue = captureThisValue(context, table, thisValueCapture, node.expression)
    return {
      expression: luaExpressions.createTableIndexExpression(thisValue, updatedAccessExpression, node),
      thisValue,
    }
  }
  return { expression: luaExpressions.createTableIndexExpression(table, updatedAccessExpression, node) }
}

export const transformPropertyAccessExpression: FunctionVisitor<ts.PropertyAccessExpression> = (
  node,
  context
) => {
  const expression = transformPropertyAccessExpressionWithCapture(context, node, undefined).expression
  if (ts.isOptionalChain(node)) return expression
  return maybeWrapThisVoidAsAdapter(context, node, expression, "fromType")
}
export function transformPropertyAccessExpressionWithCapture(
  context: TransformationContext,
  node: ts.PropertyAccessExpression,
  thisValueCapture: luaExpressions.Identifier | undefined
): ExpressionWithThisValue {
  const type = context.checker.getTypeAtLocation(node.expression)
  const isOptionalLeft = isOptionalContinuation(node.expression)

  let property = node.name.text
  const symbol = context.checker.getSymbolAtLocation(node.name)
  const customName = getCustomNameFromSymbol(context, symbol)
  if (customName != null) {
    property = customName
  }

  const constEnumValue = tryGetConstEnumValue(context, node)
  if (constEnumValue) {
    return { expression: constEnumValue }
  }

  if (ts.isCallExpression(node.expression) && returnsMultiType(context, node.expression)) {
    context.addDiagnostic(invalidMultiReturnAccess(node))
  }

  if (ts.isOptionalChain(node)) {
    return requireTransformOptionalChainWithCapture()(context, node, thisValueCapture)
  }

  const annotations = getTypeAnnotations(type)
  if (annotations.has(AnnotationKind.CompileMembersOnly)) {
    if (isOptionalLeft) {
      context.addDiagnostic(unsupportedOptionalCompileMembersOnly(node))
    }

    if (ts.isPropertyAccessExpression(node.expression)) {
      const expression = luaExpressions.createTableIndexExpression(
        context.transformExpression(node.expression.expression),
        luaExpressions.createStringLiteral(property),
        node
      )
      return { expression }
    } else {
      if (
        isSymbolExported(context, type.symbol) &&
        getSymbolExportScope(context, type.symbol) === node.expression.getSourceFile()
      ) {
        return {
          expression: luaExpressions.createTableIndexExpression(
            createExportsIdentifier(),
            luaExpressions.createStringLiteral(property),
            node
          ),
        }
      } else {
        return { expression: luaExpressions.createIdentifier(property, node) }
      }
    }
  }

  const builtinResult = transformBuiltinPropertyAccessExpression(context, node)
  if (builtinResult) {
    return { expression: builtinResult }
  }

  if (
    ts.isIdentifier(node.expression) &&
    node.parent &&
    (!ts.isCallExpression(node.parent) || node.parent.expression !== node)
  ) {
    const extensionType = getExtensionKindForNode(context, node)
    if (extensionType != null && callExtensions.has(extensionType)) {
      context.addDiagnostic(invalidCallExtensionUse(node))
    }
  }

  const table = context.transformExpression(node.expression)

  if (thisValueCapture) {
    const thisValue = captureThisValue(context, table, thisValueCapture, node.expression)
    const expression = luaExpressions.createTableIndexExpression(
      thisValue,
      luaExpressions.createStringLiteral(property),
      node
    )
    return {
      expression,
      thisValue,
    }
  }
  if (node.expression.kind === SyntaxKind.SuperKeyword) {
    const symbol = context.checker.getSymbolAtLocation(node)
    if (symbol && (symbol.flags & ts.SymbolFlags.GetAccessor) !== 0) {
      return {
        expression: transformLuaLibFunction(
          context,
          LuaLibFeature.DescriptorGet,
          node,
          luaExpressions.createIdentifier("self"),
          table,
          luaExpressions.createStringLiteral(property)
        ),
      }
    }
  }
  return {
    expression: luaExpressions.createTableIndexExpression(table, luaExpressions.createStringLiteral(property), node),
  }
}

export const transformQualifiedName: FunctionVisitor<ts.QualifiedName> = (node, context) => {
  const right = luaExpressions.createStringLiteral(node.right.text, node.right)
  const left = context.transformExpression(node.left)

  return luaExpressions.createTableIndexExpression(left, right, node)
}
