import * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { FunctionVisitor } from "../../context/visitors"
import { transformInPrecedingStatementScope } from "../../utils/preceding-statements"
import { ScopeType } from "../../utils/scope"
import { checkVariableDeclarationList, transformVariableDeclaration } from "../variable-declaration"
import { invertCondition, transformLoopBody } from "./utils"

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

  result.push(luaStatements.createWhileStatement(luaStatements.createBlock(body), condition, statement))

  context.popScope()

  return luaStatements.createDoStatement(result, statement)
}
