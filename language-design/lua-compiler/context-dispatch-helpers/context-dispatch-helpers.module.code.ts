import assert from "assert"

import * as ts from "typescript"
import { tempSymbolId } from "../context-temp-symbol-id/context-temp-symbol-id.module.code.ts"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { validateAssignment } from "../tstl-assignment-validation/tstl-assignment-validation.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { isOptionalContinuation } from "../tstl-optional-chain-data/tstl-optional-chain-data.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { isConstIdentifier } from "../tstl-typescript/tstl-typescript.module.code.ts"

function validateArguments(
  context: TransformationContext,
  params: readonly ts.Expression[],
  signature?: ts.Signature
) {
  if (!signature || signature.parameters.length < params.length) {
    return
  }
  for (const [index, param] of params.entries()) {
    const signatureParameter = signature.parameters[index]
    if (signatureParameter !== undefined && signatureParameter.valueDeclaration !== undefined) {
      const signatureType =
        context.checker.getContextualType(param) ??
        context.checker.getTypeAtLocation(signatureParameter.valueDeclaration)
      const paramType = context.checker.getTypeAtLocation(param)
      validateAssignment(context, param, paramType, signatureType, signatureParameter.name)
    }
  }
}

export function transformArguments(
  context: TransformationContext,
  params: readonly ts.Expression[],
  signature?: ts.Signature,
  callContext?: ts.Expression
): readonly luaExpressions.Expression[] {
  validateArguments(context, params, signature)
  return transformExpressionList(context, callContext ? [callContext, ...params] : params)
}

function transformCallWithArguments(
  context: TransformationContext,
  callExpression: ts.Expression,
  transformedArguments: readonly luaExpressions.Expression[],
  argPrecedingStatements: readonly luaStatements.Statement[],
  callContext?: ts.Expression
): readonly [luaExpressions.Expression, readonly luaExpressions.Expression[]] {
  let call = context.transformExpression(callExpression)

  let transformedContext: luaExpressions.Expression | undefined
  if (callContext) {
    transformedContext = context.transformExpression(callContext)
  }

  if (argPrecedingStatements.length > 0) {
    if (transformedContext) {
      transformedContext = moveToPrecedingTemp(context, transformedContext, callContext)
    }
    call = moveToPrecedingTemp(context, call, callExpression)
    context.addPrecedingStatements(argPrecedingStatements)
  }

  const finalArguments: readonly luaExpressions.Expression[] = transformedContext
    ? [transformedContext, ...transformedArguments]
    : transformedArguments

  return [call, finalArguments]
}

export function transformCallAndArguments(
  context: TransformationContext,
  callExpression: ts.Expression,
  params: readonly ts.Expression[],
  signature?: ts.Signature,
  callContext?: ts.Expression
): readonly [luaExpressions.Expression, readonly luaExpressions.Expression[]] {
  const { precedingStatements: argPrecedingStatements, result: transformedArguments } =
    transformInPrecedingStatementScope(context, () =>
      transformArguments(context, params, signature, callContext)
    )
  return transformCallWithArguments(
    context,
    callExpression,
    transformedArguments,
    argPrecedingStatements
  )
}

export function shouldMoveToTemp(
  context: TransformationContext,
  expression: luaExpressions.Expression,
  tsOriginal?: ts.Node
) {
  return (
    !luaExpressions.isLiteral(expression) &&
    !(luaExpressions.isIdentifier(expression) && expression.symbolId === tempSymbolId) &&
    !(
      tsOriginal &&
      (isConstIdentifier(context, tsOriginal) ||
        isOptionalContinuation(tsOriginal) ||
        tsOriginal.kind === ts.SyntaxKind.ThisKeyword)
    )
  )
}

export function moveToPrecedingTemp(
  context: TransformationContext,
  expression: luaExpressions.Expression,
  tsOriginal?: ts.Node
): luaExpressions.Expression {
  if (!shouldMoveToTemp(context, expression, tsOriginal)) {
    return expression
  }
  const tempIdentifier = context.createTempNameForLuaExpression(expression)
  const tempDeclaration = luaStatements.createVariableDeclarationStatement(
    tempIdentifier,
    expression,
    tsOriginal
  )
  context.addPrecedingStatements(tempDeclaration)
  return luaExpressions.cloneIdentifier(tempIdentifier, tsOriginal)
}

function transformExpressions(
  context: TransformationContext,
  expressions: readonly ts.Expression[]
): {
  transformedExpressions: readonly luaExpressions.Expression[]
  precedingStatements: readonly (readonly luaStatements.Statement[])[]
  lastPrecedingStatementsIndex: number
} {
  const precedingStatements: (readonly luaStatements.Statement[])[] = []
  const transformedExpressions: luaExpressions.Expression[] = []
  let lastPrecedingStatementsIndex = -1
  for (const [i, sourceExpression] of expressions.entries()) {
    const { precedingStatements: expressionPrecedingStatements, result: expression } =
      transformInPrecedingStatementScope(context, () =>
        context.transformExpression(sourceExpression)
      )
    transformedExpressions.push(expression)
    if (expressionPrecedingStatements.length > 0) {
      lastPrecedingStatementsIndex = i
    }
    precedingStatements.push(expressionPrecedingStatements)
  }
  return { transformedExpressions, precedingStatements, lastPrecedingStatementsIndex }
}

function transformExpressionsUsingTemps(
  context: TransformationContext,
  expressions: readonly ts.Expression[],
  transformedExpressions: readonly luaExpressions.Expression[],
  precedingStatements: readonly (readonly luaStatements.Statement[])[],
  lastPrecedingStatementsIndex: number
): readonly luaExpressions.Expression[] {
  const result: luaExpressions.Expression[] = []
  for (let i = 0; i < transformedExpressions.length; ++i) {
    const preStatements = precedingStatements[i]
    const transformed = transformedExpressions[i]
    if (preStatements === undefined || transformed === undefined) continue
    context.addPrecedingStatements(preStatements)
    if (i < lastPrecedingStatementsIndex) {
      result.push(moveToPrecedingTemp(context, transformed, expressions[i]))
    } else {
      result.push(transformed)
    }
  }
  return result
}

function pushToSparseArray(
  context: TransformationContext,
  arrayIdentifier: luaExpressions.Identifier | undefined,
  expressions: readonly luaExpressions.Expression[]
) {
  if (!arrayIdentifier) {
    arrayIdentifier = luaExpressions.createIdentifier(context.createTempName("array"))
    const libCall = transformLuaLibFunction(
      context,
      LuaLibFeature.SparseArrayNew,
      undefined,
      ...expressions
    )
    const declaration = luaStatements.createVariableDeclarationStatement(arrayIdentifier, libCall)
    context.addPrecedingStatements(declaration)
  } else {
    const libCall = transformLuaLibFunction(
      context,
      LuaLibFeature.SparseArrayPush,
      undefined,
      arrayIdentifier,
      ...expressions
    )
    context.addPrecedingStatements(luaStatements.createExpressionStatement(libCall))
  }
  return arrayIdentifier
}

function transformExpressionsUsingSparseArray(
  context: TransformationContext,
  expressions: readonly ts.Expression[],
  transformedExpressions: readonly luaExpressions.Expression[],
  precedingStatements: readonly (readonly luaStatements.Statement[])[]
) {
  let arrayIdentifier: luaExpressions.Identifier | undefined

  let expressionBatch: luaExpressions.Expression[] = []
  for (let i = 0; i < expressions.length; ++i) {
    const preStatements = precedingStatements[i]
    const transformed = transformedExpressions[i]
    const sourceExpr = expressions[i]
    if (preStatements === undefined || transformed === undefined || sourceExpr === undefined)
      continue
    if (preStatements.length > 0 && expressionBatch.length > 0) {
      arrayIdentifier = pushToSparseArray(context, arrayIdentifier, expressionBatch)
      expressionBatch = []
    }

    context.addPrecedingStatements(preStatements)
    expressionBatch.push(transformed)

    if (ts.isSpreadElement(sourceExpr)) {
      arrayIdentifier = pushToSparseArray(context, arrayIdentifier, expressionBatch)
      expressionBatch = []
    }
  }

  if (expressionBatch.length > 0) {
    arrayIdentifier = pushToSparseArray(context, arrayIdentifier, expressionBatch)
  }

  assert(arrayIdentifier)
  return [
    transformLuaLibFunction(context, LuaLibFeature.SparseArraySpread, undefined, arrayIdentifier),
  ]
}

function countNeededTemps(
  context: TransformationContext,
  expressions: readonly ts.Expression[],
  transformedExpressions: readonly luaExpressions.Expression[],
  lastPrecedingStatementsIndex: number
) {
  if (lastPrecedingStatementsIndex < 0) {
    return 0
  }
  return transformedExpressions
    .slice(0, lastPrecedingStatementsIndex)
    .filter((e, i) => shouldMoveToTemp(context, e, expressions[i])).length
}

export function transformExpressionList(
  context: TransformationContext,
  expressions: readonly ts.Expression[]
): readonly luaExpressions.Expression[] {
  const { transformedExpressions, precedingStatements, lastPrecedingStatementsIndex } =
    transformExpressions(context, expressions)

  const maxTemps = 2

  const lastSpread = expressions.findIndex((e) => ts.isSpreadElement(e))
  if (
    (lastSpread >= 0 && lastSpread < expressions.length - 1) ||
    countNeededTemps(context, expressions, transformedExpressions, lastPrecedingStatementsIndex) >
      maxTemps
  ) {
    return transformExpressionsUsingSparseArray(
      context,
      expressions,
      transformedExpressions,
      precedingStatements
    )
  } else {
    return transformExpressionsUsingTemps(
      context,
      expressions,
      transformedExpressions,
      precedingStatements,
      lastPrecedingStatementsIndex
    )
  }
}

export function transformOrderedExpressions(
  context: TransformationContext,
  expressions: readonly ts.Expression[]
): readonly luaExpressions.Expression[] {
  const { transformedExpressions, precedingStatements, lastPrecedingStatementsIndex } =
    transformExpressions(context, expressions)
  return transformExpressionsUsingTemps(
    context,
    expressions,
    transformedExpressions,
    precedingStatements,
    lastPrecedingStatementsIndex
  )
}
