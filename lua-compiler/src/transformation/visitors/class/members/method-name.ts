import type * as ts from "typescript"
import * as luaExpressions from "../../../../LuaAST-expressions"
import type { TransformationContext } from "../../../context/transformation-context"
import { transformPropertyName } from "../../property-name"
import { isStaticNode } from "../syntax"
import { createPrototypeName } from "./constructor"

export function transformMemberExpressionOwnerName(
  node: ts.PropertyDeclaration | ts.MethodDeclaration | ts.AccessorDeclaration,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  return isStaticNode(node) ? luaExpressions.cloneIdentifier(className) : createPrototypeName(className)
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
