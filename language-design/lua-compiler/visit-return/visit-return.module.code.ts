import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { validateAssignment } from "../tstl-assignment-validation/tstl-assignment-validation.module.code.ts"
import { invalidMultiFunctionReturnType } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import { createUnpackCall, wrapInTable } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { ScopeType, walkScopesUp } from "../tstl-scope/tstl-scope.module.code.ts"
import { isInAsyncFunction } from "../tstl-typescript/tstl-typescript.module.code.ts"
import {
  canBeMultiReturnType,
  isInMultiReturnFunction,
  isMultiFunctionCall,
  isMultiReturnType,
  returnsMultiType,
  shouldMultiReturnCallBeWrapped,
} from "../visit-extension-multi/visit-extension-multi.module.code.ts"

function transformExpressionsInReturn(
  context: TransformationContext,
  node: ts.Expression,
  insideTryCatch: boolean
): readonly luaExpressions.Expression[] {
  const expressionType = context.checker.getTypeAtLocation(node)

  const innerNode = ts.skipOuterExpressions(node, ts.OuterExpressionKinds.Assertions)

  if (ts.isCallExpression(innerNode)) {
    if (isMultiFunctionCall(context, innerNode)) {
      const type = context.checker.getContextualType(node)
      if (type && !canBeMultiReturnType(type)) {
        context.addDiagnostic(invalidMultiFunctionReturnType(innerNode))
      }

      let returnValues = context.transformArguments(innerNode.arguments)
      if (insideTryCatch) {
        returnValues = [wrapInTable(...returnValues)]
      }
      return returnValues
    }

    if (
      insideTryCatch &&
      returnsMultiType(context, innerNode) &&
      !shouldMultiReturnCallBeWrapped(context, innerNode)
    ) {
      return [wrapInTable(context.transformExpression(node))]
    }
  } else if (isInMultiReturnFunction(context, innerNode) && isMultiReturnType(expressionType)) {
    return [createUnpackCall(context, context.transformExpression(innerNode), innerNode)]
  }

  return [context.transformExpression(node)]
}

export function transformExpressionBodyToReturnStatement(
  context: TransformationContext,
  node: ts.Expression
): luaStatements.Statement {
  const expressions = transformExpressionsInReturn(context, node, false)
  return createReturnStatement(context, expressions, node)
}

export const transformReturnStatement: FunctionVisitor<ts.ReturnStatement> = (
  statement,
  context
) => {
  let results: readonly luaExpressions.Expression[]

  if (statement.expression) {
    const expressionType = context.checker.getTypeAtLocation(statement.expression)
    const returnType = context.checker.getContextualType(statement.expression)
    if (returnType) {
      validateAssignment(context, statement, expressionType, returnType)
    }

    results = transformExpressionsInReturn(context, statement.expression, isInTryCatch(context))
  } else {
    results = []
  }

  return createReturnStatement(context, results, statement)
}

export function createReturnStatement(
  context: TransformationContext,
  values: readonly luaExpressions.Expression[],
  node: ts.Node
): luaStatements.ReturnStatement {
  if (isInAsyncFunction(node)) {
    return luaStatements.createReturnStatement([
      luaExpressions.createCallExpression(luaExpressions.createIdentifier("____awaiter_resolve"), [
        luaExpressions.createNilLiteral(),
        ...values,
      ]),
    ])
  }

  if (isInTryCatch(context)) {
    values = [luaExpressions.createBooleanLiteral(true), ...values]
  }

  return luaStatements.createReturnStatement(values, node)
}

function isInTryCatch(context: TransformationContext): boolean {
  let insideTryCatch = false
  for (const scope of walkScopesUp(context)) {
    scope.functionReturned = true

    if (scope.type === ScopeType.Function) {
      break
    }

    insideTryCatch =
      insideTryCatch || scope.type === ScopeType.Try || scope.type === ScopeType.Catch
  }

  return insideTryCatch
}
