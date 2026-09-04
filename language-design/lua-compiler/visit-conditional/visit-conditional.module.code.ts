import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { truthyOnlyConditionalValue } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  transformInPrecedingStatementScope,
  type WithPrecedingStatements,
} from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { performHoisting, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"
import { canBeFalsy } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { transformBlockOrStatement } from "../visit-block/visit-block.module.code.ts"

function transformProtectedConditionalExpression(
  context: TransformationContext,
  expression: ts.ConditionalExpression,
  condition: WithPrecedingStatements<luaExpressions.Expression>,
  whenTrue: WithPrecedingStatements<luaExpressions.Expression>,
  whenFalse: WithPrecedingStatements<luaExpressions.Expression>
): luaExpressions.Expression {
  const tempVar = context.createTempNameForNode(expression.condition)

  const trueStatements = whenTrue.precedingStatements.concat(
    luaStatements.createAssignmentStatement(
      luaExpressions.cloneIdentifier(tempVar),
      whenTrue.result,
      expression.whenTrue
    )
  )

  const falseStatements = whenFalse.precedingStatements.concat(
    luaStatements.createAssignmentStatement(
      luaExpressions.cloneIdentifier(tempVar),
      whenFalse.result,
      expression.whenFalse
    )
  )

  context.addPrecedingStatements([
    luaStatements.createVariableDeclarationStatement(tempVar, undefined, expression.condition),
    ...condition.precedingStatements,
    luaStatements.createIfStatement(
      condition.result,
      luaStatements.createBlock(trueStatements, expression.whenTrue),
      luaStatements.createBlock(falseStatements, expression.whenFalse),
      expression
    ),
  ])
  return luaExpressions.cloneIdentifier(tempVar)
}

export const transformConditionalExpression: FunctionVisitor<ts.ConditionalExpression> = (
  expression,
  context
) => {
  if (context.luaTarget === LuaTarget.Luau) {
    return luaExpressions.createConditionalExpression(
      context.transformExpression(expression.condition),
      context.transformExpression(expression.whenTrue),
      context.transformExpression(expression.whenFalse),
      expression
    )
  }

  checkOnlyTruthyCondition(expression.condition, context)

  const condition = transformInPrecedingStatementScope(context, () =>
    context.transformExpression(expression.condition)
  )
  const whenTrue = transformInPrecedingStatementScope(context, () =>
    context.transformExpression(expression.whenTrue)
  )
  const whenFalse = transformInPrecedingStatementScope(context, () =>
    context.transformExpression(expression.whenFalse)
  )
  if (
    whenTrue.precedingStatements.length > 0 ||
    whenFalse.precedingStatements.length > 0 ||
    canBeFalsy(context, context.checker.getTypeAtLocation(expression.whenTrue))
  ) {
    return transformProtectedConditionalExpression(
      context,
      expression,
      condition,
      whenTrue,
      whenFalse
    )
  }

  context.addPrecedingStatements(condition.precedingStatements)
  const conditionAnd = luaExpressions.createBinaryExpression(
    condition.result,
    whenTrue.result,
    luaCore.SyntaxKind.AndOperator
  )
  return luaExpressions.createBinaryExpression(
    conditionAnd,
    whenFalse.result,
    luaCore.SyntaxKind.OrOperator,
    expression
  )
}

export function transformIfStatement(
  statement: ts.IfStatement,
  context: TransformationContext
): luaStatements.IfStatement {
  context.pushScope(ScopeType.Conditional, statement)

  checkOnlyTruthyCondition(statement.expression, context)

  const condition = context.transformExpression(statement.expression)
  const statements = performHoisting(
    context,
    transformBlockOrStatement(context, statement.thenStatement)
  )
  context.popScope()
  const ifBlock = luaStatements.createBlock(statements)

  if (statement.elseStatement) {
    if (ts.isIfStatement(statement.elseStatement)) {
      const tsElseStatement = statement.elseStatement
      const { precedingStatements, result: elseStatement } = transformInPrecedingStatementScope(
        context,
        () => transformIfStatement(tsElseStatement, context)
      )
      if (precedingStatements.length > 0) {
        const elseBlock = luaStatements.createBlock([...precedingStatements, elseStatement])
        return luaStatements.createIfStatement(condition, ifBlock, elseBlock)
      } else {
        return luaStatements.createIfStatement(condition, ifBlock, elseStatement)
      }
    } else {
      context.pushScope(ScopeType.Conditional, statement)
      const elseStatements = performHoisting(
        context,
        transformBlockOrStatement(context, statement.elseStatement)
      )
      context.popScope()
      const elseBlock = luaStatements.createBlock(elseStatements)
      return luaStatements.createIfStatement(condition, ifBlock, elseBlock)
    }
  }

  return luaStatements.createIfStatement(condition, ifBlock)
}

export function checkOnlyTruthyCondition(condition: ts.Expression, context: TransformationContext) {
  if (context.options.strictNullChecks === false) return
  if (ts.isElementAccessExpression(condition)) return

  if (!canBeFalsy(context, context.checker.getTypeAtLocation(condition))) {
    context.addDiagnostic(truthyOnlyConditionalValue(condition))
  }
}
