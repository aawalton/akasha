import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  transformInPrecedingStatementScope,
  type WithPrecedingStatements,
} from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { ScopeType, separateHoistedStatements } from "../tstl-scope/tstl-scope.module.code.ts"
import { createShortCircuitBinaryExpressionPrecedingStatements } from "../visitors-binary-expression/visitors-binary-expression.module.code.ts"

const containsBreakOrReturn = (nodes: Iterable<ts.Node>): boolean => {
  for (const s of nodes) {
    if (ts.isBreakStatement(s) || ts.isReturnStatement(s)) {
      return true
    } else if (ts.isBlock(s) && containsBreakOrReturn(s.statements)) {
      return true
    } else if (s.kind === ts.SyntaxKind.SyntaxList) {
      const children: ts.Node[] = []
      ts.forEachChild(s, (c) => children.push(c))
      if (containsBreakOrReturn(children)) {
        return true
      }
    }
  }

  return false
}

const createOrExpression = (
  context: TransformationContext,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[]
): WithPrecedingStatements<luaExpressions.Expression> => {
  if (rightPrecedingStatements.length > 0) {
    return createShortCircuitBinaryExpressionPrecedingStatements(
      context,
      left,
      right,
      rightPrecedingStatements,
      ts.SyntaxKind.BarBarToken
    )
  } else {
    return {
      precedingStatements: rightPrecedingStatements,
      result: luaExpressions.createBinaryExpression(left, right, luaCore.SyntaxKind.OrOperator),
    }
  }
}

const coalesceCondition = (
  condition: luaExpressions.Expression | undefined,
  conditionPrecedingStatements: readonly luaStatements.Statement[],
  switchVariable: luaExpressions.Identifier,
  expression: ts.Expression,
  context: TransformationContext
): WithPrecedingStatements<luaExpressions.Expression> => {
  const { precedingStatements, result: transformedExpression } = transformInPrecedingStatementScope(
    context,
    () => context.transformExpression(expression)
  )

  const comparison = luaExpressions.createBinaryExpression(
    switchVariable,
    transformedExpression,
    luaCore.SyntaxKind.EqualityOperator
  )
  if (condition) {
    return createOrExpression(context, condition, comparison, precedingStatements)
  }

  return {
    precedingStatements: [...conditionPrecedingStatements, ...precedingStatements],
    result: comparison,
  }
}

export const transformSwitchStatement: FunctionVisitor<ts.SwitchStatement> = (
  statement,
  context
) => {
  const scope = context.pushScope(ScopeType.Switch, statement)

  const switchName = `____switch${scope.id}`
  const conditionName = `____cond${scope.id}`
  const switchVariable = luaExpressions.createIdentifier(switchName)
  const conditionVariable = luaExpressions.createIdentifier(conditionName)

  const statements: luaStatements.Statement[] = []
  const hoistedStatements: luaStatements.Statement[] = []
  const hoistedIdentifiers: luaExpressions.Identifier[] = []
  const clauses = statement.caseBlock.clauses
  const firstClause = clauses[0]
  if (clauses.length === 1 && firstClause !== undefined && ts.isDefaultClause(firstClause)) {
    const defaultClause = firstClause.statements
    if (defaultClause.length > 0) {
      const {
        statements: defaultStatements,
        hoistedStatements: defaultHoistedStatements,
        hoistedIdentifiers: defaultHoistedIdentifiers,
      } = separateHoistedStatements(context, context.transformStatements(defaultClause))
      hoistedStatements.push(...defaultHoistedStatements)
      hoistedIdentifiers.push(...defaultHoistedIdentifiers)
      statements.push(luaStatements.createDoStatement(defaultStatements))
    }
  } else {
    let defaultTransformed = false
    let isInitialCondition = true
    let condition: luaExpressions.Expression | undefined

    let conditionPrecedingStatements: readonly luaStatements.Statement[] = []
    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i]
      if (clause === undefined) continue
      const previousClause: ts.CaseOrDefaultClause | undefined = clauses[i - 1]

      if (i === 0 && ts.isDefaultClause(clause)) continue
      if (
        ts.isDefaultClause(clause) &&
        previousClause &&
        containsBreakOrReturn(previousClause.statements)
      ) {
        continue
      }

      if (!ts.isDefaultClause(clause)) {
        const { precedingStatements, result } = coalesceCondition(
          condition,
          conditionPrecedingStatements,
          switchVariable,
          clause.expression,
          context
        )
        conditionPrecedingStatements = precedingStatements
        condition = result

        if (i !== clauses.length - 1 && clause.statements.length === 0) continue

        if (isInitialCondition) {
          statements.push(
            ...conditionPrecedingStatements,
            luaStatements.createVariableDeclarationStatement(conditionVariable, condition)
          )
        } else {
          const { precedingStatements, result } = createOrExpression(
            context,
            conditionVariable,
            condition,
            conditionPrecedingStatements
          )
          conditionPrecedingStatements = precedingStatements
          condition = result

          statements.push(
            ...conditionPrecedingStatements,
            luaStatements.createAssignmentStatement(conditionVariable, condition)
          )
        }
        isInitialCondition = false
      } else {
        if (isInitialCondition) {
          statements.push(
            ...conditionPrecedingStatements,
            luaStatements.createVariableDeclarationStatement(
              conditionVariable,
              condition ?? luaExpressions.createBooleanLiteral(false)
            )
          )

          condition = undefined
          conditionPrecedingStatements = []
          isInitialCondition = false
        }

        if (i === clauses.length - 1) {
          if (condition) {
            const { precedingStatements, result } = createOrExpression(
              context,
              conditionVariable,
              condition,
              conditionPrecedingStatements
            )
            conditionPrecedingStatements = precedingStatements
            condition = result
            statements.push(
              ...conditionPrecedingStatements,
              luaStatements.createAssignmentStatement(conditionVariable, condition)
            )
          }
          continue
        }
      }

      const {
        statements: rawClauseStatements,
        hoistedStatements: clauseHoistedStatements,
        hoistedIdentifiers: clauseHoistedIdentifiers,
      } = separateHoistedStatements(context, context.transformStatements(clause.statements))
      const clauseStatements: readonly luaStatements.Statement[] =
        i === clauses.length - 1 && !containsBreakOrReturn(clause.statements)
          ? [...rawClauseStatements, luaStatements.createBreakStatement()]
          : rawClauseStatements
      hoistedStatements.push(...clauseHoistedStatements)
      hoistedIdentifiers.push(...clauseHoistedIdentifiers)

      if (ts.isDefaultClause(clause)) {
        defaultTransformed = true
      }

      statements.push(
        luaStatements.createIfStatement(
          conditionVariable,
          luaStatements.createBlock(clauseStatements)
        )
      )

      condition = undefined
      conditionPrecedingStatements = []
    }

    const start = clauses.findIndex((c) => ts.isDefaultClause(c))
    if (start >= 0) {
      const end = clauses.findIndex(
        (clause, index) => index >= start && containsBreakOrReturn(clause.statements)
      )

      const startClause = clauses[start]
      const {
        statements: rawDefaultStatements,
        hoistedStatements: defaultHoistedStatements,
        hoistedIdentifiers: defaultHoistedIdentifiers,
      } = separateHoistedStatements(
        context,
        context.transformStatements(startClause === undefined ? [] : startClause.statements)
      )

      if (!defaultTransformed) {
        hoistedStatements.push(...defaultHoistedStatements)
        hoistedIdentifiers.push(...defaultHoistedIdentifiers)
      }

      const fallthroughStatements: luaStatements.Statement[] = [...rawDefaultStatements]
      for (const clause of clauses.slice(start + 1, end >= 0 ? end + 1 : undefined)) {
        let statements = context.transformStatements(clause.statements)
        ;({ statements } = separateHoistedStatements(context, statements))
        fallthroughStatements.push(...statements)
      }

      if (fallthroughStatements.length > 0) {
        statements.push(luaStatements.createDoStatement(fallthroughStatements))
      }
    }
  }

  statements.unshift(...hoistedStatements)
  if (hoistedIdentifiers.length > 0) {
    statements.unshift(luaStatements.createVariableDeclarationStatement(hoistedIdentifiers))
  }

  context.popScope()

  const expression = context.transformExpression(statement.expression)
  statements.unshift(luaStatements.createVariableDeclarationStatement(switchVariable, expression))

  return luaStatements.createRepeatStatement(
    luaStatements.createBlock(statements),
    luaExpressions.createBooleanLiteral(true)
  )
}
