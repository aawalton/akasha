import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { createClassMethodDecoratingExpression } from "../visit-decorators/visit-decorators.module.code.ts"
import { transformFunctionToExpression } from "../visit-function/visit-function.module.code.ts"
import {
  transformMemberExpressionOwnerName,
  transformMethodName,
} from "../visit-method-name/visit-method-name.module.code.ts"

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
