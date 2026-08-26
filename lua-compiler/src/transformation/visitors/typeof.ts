import * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import { LuaLibFeature } from "../../LuaLib"
import type { TransformationContext } from "../context/transformation-context"
import type { FunctionVisitor } from "../context/visitors"
import { transformLuaLibFunction } from "../utils/lualib"
import { transformBinaryOperation } from "./binary-expression"
import { transformTypeOfBinaryExpressionHolder } from "./binary-expression/typeof-deps"

export const transformTypeOfExpression: FunctionVisitor<ts.TypeOfExpression> = (node, context) => {
  const innerExpression = context.transformExpression(node.expression)
  return transformLuaLibFunction(context, LuaLibFeature.TypeOf, node, innerExpression)
}

export function transformTypeOfBinaryExpression(
  context: TransformationContext,
  node: ts.BinaryExpression
): luaExpressions.Expression | undefined {
  const operator = node.operatorToken.kind
  if (
    operator !== ts.SyntaxKind.EqualsEqualsToken &&
    operator !== ts.SyntaxKind.EqualsEqualsEqualsToken &&
    operator !== ts.SyntaxKind.ExclamationEqualsToken &&
    operator !== ts.SyntaxKind.ExclamationEqualsEqualsToken
  ) {
    return
  }

  let literalExpression: ts.Expression
  let typeOfExpression: ts.TypeOfExpression
  if (ts.isTypeOfExpression(node.left)) {
    typeOfExpression = node.left
    literalExpression = node.right
  } else if (ts.isTypeOfExpression(node.right)) {
    typeOfExpression = node.right
    literalExpression = node.left
  } else {
    return
  }

  const comparedExpression = context.transformExpression(literalExpression)
  if (!luaExpressions.isStringLiteral(comparedExpression)) return

  if (comparedExpression.value === "object") {
    comparedExpression.value = "table"
  } else if (comparedExpression.value === "undefined") {
    comparedExpression.value = "nil"
  }

  const innerExpression = context.transformExpression(typeOfExpression.expression)
  const typeCall = luaExpressions.createCallExpression(
    luaExpressions.createIdentifier("type"),
    [innerExpression],
    typeOfExpression
  )
  const { precedingStatements, result } = transformBinaryOperation(
    context,
    typeCall,
    comparedExpression,
    [],
    operator,
    node
  )
  context.addPrecedingStatements(precedingStatements)
  return result
}

transformTypeOfBinaryExpressionHolder.fn = transformTypeOfBinaryExpression
