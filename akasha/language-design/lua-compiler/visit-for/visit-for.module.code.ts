import * as ts from "typescript"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"
import { invertCondition, transformLoopBody } from "../visit-utils/visit-utils.module.code.ts"
import {
  checkVariableDeclarationList,
  transformVariableDeclaration,
} from "../visit-variable-declaration/visit-variable-declaration.module.code.ts"

export const transformForStatement: FunctionVisitor<ts.ForStatement> = (statement, context) => {
  const result: luaStatements.Statement[] = []

  context.pushScope(ScopeType.Loop, statement)

  if (statement.initializer) {
    if (ts.isVariableDeclarationList(statement.initializer)) {
      checkVariableDeclarationList(context, statement.initializer)
      result.push(
        ...statement.initializer.declarations.flatMap((d) =>
          transformVariableDeclaration(context, d)
        )
      )
    } else {
      result.push(
        ...context.transformStatements(ts.factory.createExpressionStatement(statement.initializer))
      )
    }
  }

  let body: readonly luaStatements.Statement[] = transformLoopBody(context, statement)

  let condition: luaExpressions.Expression
  if (statement.condition) {
    const tsCondition = statement.condition
    const { precedingStatements: conditionPrecedingStatements, result: conditionResult } =
      transformInPrecedingStatementScope(context, () => context.transformExpression(tsCondition))
    condition = conditionResult

    if (conditionPrecedingStatements.length > 0) {
      const expandedPreceding: readonly luaStatements.Statement[] = [
        ...conditionPrecedingStatements,
        luaStatements.createIfStatement(
          invertCondition(condition),
          luaStatements.createBlock([luaStatements.createBreakStatement()]),
          undefined,
          statement.condition
        ),
      ]
      body = [...expandedPreceding, ...body]
      condition = luaExpressions.createBooleanLiteral(true)
    }
  } else {
    condition = luaExpressions.createBooleanLiteral(true)
  }

  if (statement.incrementor) {
    body = [
      ...body,
      ...context.transformStatements(ts.factory.createExpressionStatement(statement.incrementor)),
    ]
  }

  result.push(
    luaStatements.createWhileStatement(luaStatements.createBlock(body), condition, statement)
  )

  context.popScope()

  return luaStatements.createDoStatement(result, statement)
}
