import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { createPrototypeName } from "akasha/design/language/lua-compiler/visit-constructor/visit-constructor.module.code.ts"
import { transformPropertyName } from "akasha/design/language/lua-compiler/visit-property-name/visit-property-name.module.code.ts"
import { isStaticNode } from "akasha/design/language/lua-compiler/visit-syntax/visit-syntax.module.code.ts"
import type * as ts from "typescript"

export function transformMemberExpressionOwnerName(
  node: ts.PropertyDeclaration | ts.MethodDeclaration | ts.AccessorDeclaration,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  return isStaticNode(node)
    ? luaExpressions.cloneIdentifier(className)
    : createPrototypeName(className)
}

export function transformMethodName(
  context: TransformationContext,
  node: ts.MethodDeclaration
): luaExpressions.Expression {
  const methodName = transformPropertyName(context, node.name)
  if (luaExpressions.isStringLiteral(methodName) && methodName.value === "toString") {
    return luaExpressions.createStringLiteral("__tostring", node.name)
  }
  return methodName
}
