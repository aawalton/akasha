import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/modules/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/modules/lualib-features/lualib-features.module.code.ts"
import { TRANSFORM_TYPE_OF_BINARY_EXPRESSION_HOLDER } from "akasha/design/language/lua-compiler/modules/visit-typeof-deps/visit-typeof-deps.module.code.ts"
import { transformBinaryOperation } from "akasha/design/language/lua-compiler/modules/visitors-binary-expression/visitors-binary-expression.module.code.ts"
import * as ts from "typescript"

export const transformTypeOfExpression: FunctionVisitor<ts.TypeOfExpression> = (node, context) => {
  const innerExpression = context.transformExpression(node.expression)
  return transformLuaLibFunction(context, LuaLibFeature.TypeOf, node, innerExpression)
}

function transformTypeOfBinaryExpression(
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

TRANSFORM_TYPE_OF_BINARY_EXPRESSION_HOLDER.fn = transformTypeOfBinaryExpression
