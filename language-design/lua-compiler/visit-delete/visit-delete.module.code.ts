import * as ts from "typescript"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "../lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { transformLuaLibFunction } from "../lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "../lualib-features/lualib-features.module.code.ts"
import { unsupportedProperty } from "../transform-diagnostics/transform-diagnostics.module.code.ts"
import { addToNumericExpression } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import { isArrayType, isNumberType } from "../typescript/typescript.module.code.ts"
import { transformOptionalDeleteExpression } from "../visit-optional-chaining/visit-optional-chaining.module.code.ts"

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
