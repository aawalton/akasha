import * as ts from "typescript"
import * as luaStatements from "../../../../LuaAST-statements"
import * as luaExpressions from "../../../../LuaAST-expressions"
import type { TransformationContext } from "../../../context/transformation-context"
import { transformFunctionToExpression } from "../../function"
import { createClassMethodDecoratingExpression } from "../decorators"
import { transformMemberExpressionOwnerName, transformMethodName } from "./method-name"

export function transformMethodDeclaration(
  context: TransformationContext,
  node: ts.MethodDeclaration,
  className: luaExpressions.Identifier
): readonly luaStatements.Statement[] {
  if (!node.body) return []

  const methodTable = transformMemberExpressionOwnerName(node, className)
  const methodName = transformMethodName(context, node)
  const [functionExpression] = transformFunctionToExpression(context, node)

  const methodHasDecorators = (ts.getDecorators(node)?.length ?? 0) > 0
  const methodHasParameterDecorators = node.parameters.some(
    (p) => (ts.getDecorators(p)?.length ?? 0) > 0
  )

  if (methodHasDecorators || methodHasParameterDecorators) {
    if (context.options.experimentalDecorators) {
      return [
        luaStatements.createAssignmentStatement(
          luaExpressions.createTableIndexExpression(methodTable, methodName),
          functionExpression
        ),
        luaStatements.createExpressionStatement(
          createClassMethodDecoratingExpression(context, node, functionExpression, className)
        ),
      ]
    } else {
      return [
        luaStatements.createAssignmentStatement(
          luaExpressions.createTableIndexExpression(methodTable, methodName),
          createClassMethodDecoratingExpression(context, node, functionExpression, className),
          node
        ),
      ]
    }
  } else {
    return [
      luaStatements.createAssignmentStatement(
        luaExpressions.createTableIndexExpression(methodTable, methodName),
        functionExpression,
        node
      ),
    ]
  }
}
