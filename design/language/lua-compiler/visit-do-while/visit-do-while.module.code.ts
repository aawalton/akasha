import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type { FunctionVisitor } from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import { transformInPrecedingStatementScope } from "akasha/design/language/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import { checkOnlyTruthyCondition } from "akasha/design/language/lua-compiler/visit-conditional/visit-conditional.module.code.ts"
import {
  invertCondition,
  transformLoopBody,
} from "akasha/design/language/lua-compiler/visit-utils/visit-utils.module.code.ts"
import type * as ts from "typescript"

export const transformWhileStatement: FunctionVisitor<ts.WhileStatement> = (statement, context) => {
  checkOnlyTruthyCondition(statement.expression, context)

  const body = transformLoopBody(context, statement)

  const { precedingStatements: rawConditionPreceding, result: rawCondition } =
    transformInPrecedingStatementScope(context, () =>
      context.transformExpression(statement.expression)
    )

  let condition = rawCondition
  let finalBody: readonly luaStatements.Statement[] = body
  if (rawConditionPreceding.length > 0) {
    const expandedPreceding: readonly luaStatements.Statement[] = [
      ...rawConditionPreceding,
      luaStatements.createIfStatement(
        invertCondition(rawCondition),
        luaStatements.createBlock([luaStatements.createBreakStatement()]),
        undefined,
        statement.expression
      ),
    ]
    finalBody = [...expandedPreceding, ...body]
    condition = luaExpressions.createBooleanLiteral(true)
  }

  return luaStatements.createWhileStatement(
    luaStatements.createBlock(finalBody),
    condition,
    statement
  )
}

export const transformDoStatement: FunctionVisitor<ts.DoStatement> = (statement, context) => {
  checkOnlyTruthyCondition(statement.expression, context)

  const body = luaStatements.createDoStatement(transformLoopBody(context, statement))

  const { precedingStatements: rawConditionPreceding, result: rawCondition } =
    transformInPrecedingStatementScope(context, () =>
      invertCondition(context.transformExpression(statement.expression))
    )

  let condition = rawCondition
  let conditionPrecedingStatements: readonly luaStatements.Statement[] = rawConditionPreceding
  if (rawConditionPreceding.length > 0) {
    conditionPrecedingStatements = [
      ...rawConditionPreceding,
      luaStatements.createIfStatement(
        rawCondition,
        luaStatements.createBlock([luaStatements.createBreakStatement()]),
        undefined,
        statement.expression
      ),
    ]
    condition = luaExpressions.createBooleanLiteral(false)
  }

  return luaStatements.createRepeatStatement(
    luaStatements.createBlock([body, ...conditionPrecedingStatements]),
    condition,
    statement
  )
}
