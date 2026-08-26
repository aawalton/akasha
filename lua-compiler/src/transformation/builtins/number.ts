import * as ts from "typescript"

import { LuaTarget } from "../../CompilerOptions"
import * as luaCore from "../../LuaAST-core"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { unsupportedProperty } from "../utils/diagnostics"
import { createNaN } from "../utils/lua-ast"
import { transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"

export function transformNumberPrototypeCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const params = context.transformArguments(node.arguments, signature)
  const caller = context.transformExpression(calledMethod.expression)

  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "toString":
      return params.length === 0
        ? luaExpressions.createCallExpression(luaExpressions.createIdentifier("tostring"), [caller], node)
        : transformLuaLibFunction(context, LuaLibFeature.NumberToString, node, caller, ...params)
    case "toFixed":
      return transformLuaLibFunction(context, LuaLibFeature.NumberToFixed, node, caller, ...params)
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "number", expressionName))
  }
}

export function transformNumberProperty(
  context: TransformationContext,
  node: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const name = node.name.text

  switch (name) {
    case "POSITIVE_INFINITY":
      if (context.luaTarget === LuaTarget.Lua50) {
        const one = luaExpressions.createNumericLiteral(1)
        const zero = luaExpressions.createNumericLiteral(0)
        return luaExpressions.createBinaryExpression(one, zero, luaCore.SyntaxKind.DivisionOperator)
      } else {
        const math = luaExpressions.createIdentifier("math")
        const huge = luaExpressions.createStringLiteral("huge")
        return luaExpressions.createTableIndexExpression(math, huge, node)
      }
    case "NEGATIVE_INFINITY":
      if (context.luaTarget === LuaTarget.Lua50) {
        const one = luaExpressions.createNumericLiteral(1)
        const zero = luaExpressions.createNumericLiteral(0)
        return luaExpressions.createUnaryExpression(
          luaExpressions.createBinaryExpression(one, zero, luaCore.SyntaxKind.DivisionOperator),
          luaCore.SyntaxKind.NegationOperator
        )
      } else {
        const math = luaExpressions.createIdentifier("math")
        const huge = luaExpressions.createStringLiteral("huge")
        return luaExpressions.createUnaryExpression(
          luaExpressions.createTableIndexExpression(math, huge, node),
          luaCore.SyntaxKind.NegationOperator
        )
      }
    case "NaN":
      return createNaN(node)
    case "EPSILON":
      return luaExpressions.createBinaryExpression(
        luaExpressions.createNumericLiteral(2),
        luaExpressions.createNumericLiteral(-52),
        luaCore.SyntaxKind.PowerOperator,
        node
      )
    case "MIN_VALUE":
      return luaExpressions.createBinaryExpression(
        luaExpressions.createNumericLiteral(-2),
        luaExpressions.createNumericLiteral(1074),
        luaCore.SyntaxKind.PowerOperator,
        node
      )
    case "MIN_SAFE_INTEGER":
      return luaExpressions.createBinaryExpression(
        luaExpressions.createNumericLiteral(-2),
        luaExpressions.createNumericLiteral(1074),
        luaCore.SyntaxKind.PowerOperator,
        node
      )
    case "MAX_SAFE_INTEGER":
      return luaExpressions.createBinaryExpression(
        luaExpressions.createNumericLiteral(2),
        luaExpressions.createNumericLiteral(1024),
        luaCore.SyntaxKind.PowerOperator,
        node
      )
    case "MAX_VALUE":
      return luaExpressions.createBinaryExpression(
        luaExpressions.createNumericLiteral(2),
        luaExpressions.createNumericLiteral(1024),
        luaCore.SyntaxKind.PowerOperator,
        node
      )

    default:
      context.addDiagnostic(unsupportedProperty(node.name, "Number", name))
  }
}

export function transformNumberConstructorCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.CallExpression | undefined {
  const parameters = context.transformArguments(node.arguments)
  const methodName = calledMethod.name.text
  switch (methodName) {
    case "isInteger":
      return transformLuaLibFunction(context, LuaLibFeature.NumberIsInteger, node, ...parameters)
    case "isNaN":
      return transformLuaLibFunction(context, LuaLibFeature.NumberIsNaN, node, ...parameters)
    case "isFinite":
      return transformLuaLibFunction(context, LuaLibFeature.NumberIsFinite, node, ...parameters)
    case "parseInt":
      return transformLuaLibFunction(context, LuaLibFeature.NumberParseInt, node, ...parameters)
    case "parseFloat":
      return transformLuaLibFunction(context, LuaLibFeature.NumberParseFloat, node, ...parameters)
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Number", methodName))
  }
}
