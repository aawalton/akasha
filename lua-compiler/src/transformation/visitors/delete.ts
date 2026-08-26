import * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { FunctionVisitor } from "../context/visitors"
import { unsupportedProperty } from "../utils/diagnostics"
import { addToNumericExpression } from "../utils/lua-ast"
import { transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { isArrayType, isNumberType } from "../utils/typescript/types"
import { transformOptionalDeleteExpression } from "./optional-chaining"

export const transformDeleteExpression: FunctionVisitor<ts.DeleteExpression> = (node, context) => {
  if (ts.isOptionalChain(node.expression)) {
    return transformOptionalDeleteExpression(context, node, node.expression)
  }

  let ownerExpression: luaExpressions.Expression | undefined
  let propertyExpression: luaExpressions.Expression | undefined

  if (ts.isPropertyAccessExpression(node.expression)) {
    if (ts.isPrivateIdentifier(node.expression.name))
      throw new Error("PrivateIdentifier is not supported")
    ownerExpression = context.transformExpression(node.expression.expression)
    propertyExpression = luaExpressions.createStringLiteral(node.expression.name.text)
  } else if (ts.isElementAccessExpression(node.expression)) {
    ownerExpression = context.transformExpression(node.expression.expression)
    propertyExpression = context.transformExpression(node.expression.argumentExpression)

    const type = context.checker.getTypeAtLocation(node.expression.expression)
    const argumentType = context.checker.getTypeAtLocation(node.expression.argumentExpression)

    if (isArrayType(context, type) && isNumberType(context, argumentType)) {
      propertyExpression = addToNumericExpression(propertyExpression, 1)
    }
  }

  if (!ownerExpression || !propertyExpression) {
    context.addDiagnostic(unsupportedProperty(node, "delete", ts.SyntaxKind[node.kind]))
    return luaExpressions.createNilLiteral()
  }

  return transformLuaLibFunction(
    context,
    LuaLibFeature.Delete,
    node,
    ownerExpression,
    propertyExpression
  )
}
