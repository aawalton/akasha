import type * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { FunctionVisitor } from "../../context/visitors"
import { transformInPrecedingStatementScope } from "../../utils/preceding-statements"
import { checkOnlyTruthyCondition } from "../conditional"
import { invertCondition, transformLoopBody } from "./utils"

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

  return luaStatements.createWhileStatement(luaStatements.createBlock(finalBody), condition, statement)
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
