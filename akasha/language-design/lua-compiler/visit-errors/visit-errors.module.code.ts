import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  unsupportedForTarget,
  unsupportedForTargetButOverrideAvailable,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import { createUnpackCall } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { type Scope, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"
import {
  isInAsyncFunction,
  isInGeneratorFunction,
} from "../tstl-typescript/tstl-typescript.module.code.ts"
import { cast } from "../tstl-utils/tstl-utils.module.code.ts"
import { wrapInAsyncAwaiter } from "../visit-async-await/visit-async-await.module.code.ts"
import { transformScopeBlock } from "../visit-block/visit-block.module.code.ts"
import { isInMultiReturnFunction } from "../visit-extension-multi/visit-extension-multi.module.code.ts"
import { transformIdentifier } from "../visit-identifier/visit-identifier.module.code.ts"
import { createReturnStatement } from "../visit-return/visit-return.module.code.ts"

const transformAsyncTry: FunctionVisitor<ts.TryStatement> = (statement, context) => {
  const [tryBlock] = transformScopeBlock(context, statement.tryBlock, ScopeType.Try)

  if (
    (context.options.luaTarget === LuaTarget.Lua50 ||
      context.options.luaTarget === LuaTarget.Lua51) &&
    !context.options.lua51AllowTryCatchInAsyncAwait
  ) {
    context.addDiagnostic(
      unsupportedForTargetButOverrideAvailable(
        statement,
        "try/catch inside async functions",
        LuaTarget.Lua51,
        "lua51AllowTryCatchInAsyncAwait"
      )
    )
    return tryBlock.statements
  }

  const awaiter = wrapInAsyncAwaiter(context, tryBlock.statements, false)
  const awaiterIdentifier = luaExpressions.createIdentifier("____try")
  const awaiterDefinition = luaStatements.createVariableDeclarationStatement(
    awaiterIdentifier,
    awaiter
  )

  const result: luaStatements.Statement[] = [awaiterDefinition]

  if (statement.finallyBlock) {
    const awaiterFinally = luaExpressions.createTableIndexExpression(
      awaiterIdentifier,
      luaExpressions.createStringLiteral("finally")
    )
    const finallyFunction = luaExpressions.createFunctionExpression(
      luaStatements.createBlock(context.transformStatements(statement.finallyBlock.statements))
    )
    const finallyCall = luaExpressions.createCallExpression(
      awaiterFinally,
      [awaiterIdentifier, finallyFunction],
      statement.finallyBlock
    )
    result.push(luaStatements.createExpressionStatement(finallyCall))
  }

  if (statement.catchClause) {
    const [catchFunction] = transformCatchClause(context, statement.catchClause)
    if (catchFunction.params) {
      catchFunction.params = [luaExpressions.createAnonymousIdentifier(), ...catchFunction.params]
    }

    const awaiterCatch = luaExpressions.createTableIndexExpression(
      awaiterIdentifier,
      luaExpressions.createStringLiteral("catch")
    )
    const catchCall = luaExpressions.createCallExpression(awaiterCatch, [
      awaiterIdentifier,
      catchFunction,
    ])

    const promiseAwait = transformLuaLibFunction(context, LuaLibFeature.Await, statement, catchCall)
    result.push(luaStatements.createExpressionStatement(promiseAwait, statement))
  } else {
    const promiseAwait = transformLuaLibFunction(
      context,
      LuaLibFeature.Await,
      statement,
      awaiterIdentifier
    )
    result.push(luaStatements.createExpressionStatement(promiseAwait, statement))
  }

  return result
}

export const transformTryStatement: FunctionVisitor<ts.TryStatement> = (statement, context) => {
  if (isInAsyncFunction(statement)) {
    return transformAsyncTry(statement, context)
  }

  const [tryBlock, tryScope] = transformScopeBlock(context, statement.tryBlock, ScopeType.Try)

  if (
    (context.options.luaTarget === LuaTarget.Lua50 ||
      context.options.luaTarget === LuaTarget.Lua51) &&
    isInGeneratorFunction(statement)
  ) {
    context.addDiagnostic(
      unsupportedForTarget(statement, "try/catch inside generator functions", LuaTarget.Lua51)
    )
    return tryBlock.statements
  }

  const tryResultIdentifier = luaExpressions.createIdentifier("____try")
  const returnValueIdentifier = luaExpressions.createIdentifier("____returnValue")

  const result: luaStatements.Statement[] = []

  const returnedIdentifier = luaExpressions.createIdentifier("____hasReturned")
  let returnCondition: luaExpressions.Expression | undefined

  const pCall = luaExpressions.createIdentifier("pcall")
  const tryCall = luaExpressions.createCallExpression(pCall, [
    luaExpressions.createFunctionExpression(tryBlock),
  ])

  if (statement.catchClause && statement.catchClause.block.statements.length > 0) {
    const [catchFunction, catchScope] = transformCatchClause(context, statement.catchClause)
    const catchIdentifier = luaExpressions.createIdentifier("____catch")
    result.push(luaStatements.createVariableDeclarationStatement(catchIdentifier, catchFunction))

    const hasReturn = tryScope.functionReturned ?? catchScope.functionReturned

    const tryReturnIdentifiers = [tryResultIdentifier]
    if (hasReturn || statement.catchClause.variableDeclaration) {
      tryReturnIdentifiers.push(returnedIdentifier)
      if (hasReturn) {
        tryReturnIdentifiers.push(returnValueIdentifier)
        returnCondition = luaExpressions.cloneIdentifier(returnedIdentifier)
      }
    }
    result.push(luaStatements.createVariableDeclarationStatement(tryReturnIdentifiers, tryCall))

    const catchCall = luaExpressions.createCallExpression(
      catchIdentifier,
      statement.catchClause.variableDeclaration
        ? [luaExpressions.cloneIdentifier(returnedIdentifier)]
        : []
    )
    const catchCallStatement = hasReturn
      ? luaStatements.createAssignmentStatement(
          [
            luaExpressions.cloneIdentifier(returnedIdentifier),
            luaExpressions.cloneIdentifier(returnValueIdentifier),
          ],
          catchCall
        )
      : luaStatements.createExpressionStatement(catchCall)

    const notTryCondition = luaExpressions.createUnaryExpression(
      tryResultIdentifier,
      luaCore.SyntaxKind.NotOperator
    )
    result.push(
      luaStatements.createIfStatement(
        notTryCondition,
        luaStatements.createBlock([catchCallStatement])
      )
    )
  } else if (tryScope.functionReturned) {
    const returnedVariables = [tryResultIdentifier, returnedIdentifier, returnValueIdentifier]
    result.push(luaStatements.createVariableDeclarationStatement(returnedVariables, tryCall))

    returnCondition = luaExpressions.createBinaryExpression(
      luaExpressions.cloneIdentifier(tryResultIdentifier),
      returnedIdentifier,
      luaCore.SyntaxKind.AndOperator
    )
  } else {
    result.push(luaStatements.createExpressionStatement(tryCall))
  }

  if (statement.finallyBlock && statement.finallyBlock.statements.length > 0) {
    result.push(...context.transformStatements(statement.finallyBlock))
  }

  if (returnCondition && returnedIdentifier) {
    const returnValues: luaExpressions.Expression[] = []

    if (isInMultiReturnFunction(context, statement)) {
      returnValues.push(
        createUnpackCall(context, luaExpressions.cloneIdentifier(returnValueIdentifier))
      )
    } else {
      returnValues.push(luaExpressions.cloneIdentifier(returnValueIdentifier))
    }

    const returnStatement = createReturnStatement(context, returnValues, statement)
    const ifReturnedStatement = luaStatements.createIfStatement(
      returnCondition,
      luaStatements.createBlock([returnStatement])
    )
    result.push(ifReturnedStatement)
  }

  return luaStatements.createDoStatement(result, statement)
}

export const transformThrowStatement: FunctionVisitor<ts.ThrowStatement> = (statement, context) => {
  const parameters: luaExpressions.Expression[] = []

  if (statement.expression) {
    parameters.push(context.transformExpression(statement.expression))
    parameters.push(luaExpressions.createNumericLiteral(0))
  }

  return luaStatements.createExpressionStatement(
    luaExpressions.createCallExpression(luaExpressions.createIdentifier("error"), parameters),
    statement
  )
}

function transformCatchClause(
  context: TransformationContext,
  catchClause: ts.CatchClause
): readonly [luaExpressions.FunctionExpression, Scope] {
  const [catchBlock, catchScope] = transformScopeBlock(context, catchClause.block, ScopeType.Catch)

  const catchParameter = catchClause.variableDeclaration
    ? transformIdentifier(context, cast(catchClause.variableDeclaration.name, ts.isIdentifier))
    : undefined
  const catchFunction = luaExpressions.createFunctionExpression(
    catchBlock,
    catchParameter ? [luaExpressions.cloneIdentifier(catchParameter)] : []
  )

  return [catchFunction, catchScope]
}
