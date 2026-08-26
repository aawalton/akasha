import type * as ts from "typescript"
import * as luaCore from "../../LuaAST-core"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { getExtensionKindForType } from "../utils/language-extensions"
import { isFunctionType } from "../utils/typescript/types"

export function createCallableTable(functionExpression: luaExpressions.Expression): luaExpressions.Expression {
  if (luaExpressions.isFunctionExpression(functionExpression)) {
    if (functionExpression.params) {
      functionExpression.params = [luaExpressions.createAnonymousIdentifier(), ...functionExpression.params]
    }
  } else {
    functionExpression = luaExpressions.createFunctionExpression(
      luaStatements.createBlock([
        luaStatements.createReturnStatement([
          luaExpressions.createCallExpression(functionExpression, [luaExpressions.createDotsLiteral()]),
        ]),
      ]),
      [luaExpressions.createAnonymousIdentifier()],
      luaExpressions.createDotsLiteral(),
      luaCore.NodeFlags.Inline
    )
  }
  return luaExpressions.createCallExpression(luaExpressions.createIdentifier("setmetatable"), [
    luaExpressions.createTableExpression(),
    luaExpressions.createTableExpression([
      luaExpressions.createTableFieldExpression(functionExpression, luaExpressions.createStringLiteral("__call")),
    ]),
  ])
}

export function isFunctionTypeWithProperties(
  context: TransformationContext,
  functionType: ts.Type
): boolean {
  if (functionType.isUnion()) {
    return functionType.types.some((t) => isFunctionTypeWithProperties(context, t))
  } else {
    return (
      isFunctionType(functionType) &&
      functionType.getProperties().length > 0 &&
      getExtensionKindForType(context, functionType) === undefined
    )
  }
}
