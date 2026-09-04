import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { getExtensionKindForType } from "../tstl-language-extensions/tstl-language-extensions.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { isFunctionType } from "../tstl-typescript/tstl-typescript.module.code.ts"

export function createCallableTable(
  functionExpression: luaExpressions.Expression
): luaExpressions.Expression {
  if (luaExpressions.isFunctionExpression(functionExpression)) {
    if (functionExpression.params) {
      functionExpression.params = [
        luaExpressions.createAnonymousIdentifier(),
        ...functionExpression.params,
      ]
    }
  } else {
    functionExpression = luaExpressions.createFunctionExpression(
      luaStatements.createBlock([
        luaStatements.createReturnStatement([
          luaExpressions.createCallExpression(functionExpression, [
            luaExpressions.createDotsLiteral(),
          ]),
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
      luaExpressions.createTableFieldExpression(
        functionExpression,
        luaExpressions.createStringLiteral("__call")
      ),
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
