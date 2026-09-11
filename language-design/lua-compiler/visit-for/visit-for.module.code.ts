import type { FunctionVisitor } from "akasha/language-design/lua-compiler/context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/language-design/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformInPrecedingStatementScope } from "akasha/language-design/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import { ScopeType } from "akasha/language-design/lua-compiler/scope/scope.module.code.ts"
import {
  invertCondition,
  transformLoopBody,
} from "akasha/language-design/lua-compiler/visit-utils/visit-utils.module.code.ts"
import {
  checkVariableDeclarationList,
  transformVariableDeclaration,
} from "akasha/language-design/lua-compiler/visit-variable-declaration/visit-variable-declaration.module.code.ts"
import * as ts from "typescript"

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
