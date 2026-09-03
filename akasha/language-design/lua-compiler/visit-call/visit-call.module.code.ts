import * as ts from "typescript"
import { transformBuiltinCallExpression } from "../builtins/builtins.module.code.ts"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { unsupportedBuiltinOptionalCall } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  ContextType,
  getCallContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import { wrapInTable } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { getOptionalContinuationData } from "../tstl-optional-chain-data/tstl-optional-chain-data.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { isValidLuaIdentifier } from "../tstl-safe-names/tstl-safe-names.module.code.ts"
import {
  getCalledExpression,
  isExpressionWithEvaluationEffect,
} from "../tstl-typescript/tstl-typescript.module.code.ts"
import { transformElementAccessArgument } from "../visit-access/visit-access.module.code.ts"
import { transformLanguageExtensionCallExpression } from "../visit-extension-call-extension/visit-extension-call-extension.module.code.ts"
import {
  isMultiReturnCall,
  shouldMultiReturnCallBeWrapped,
} from "../visit-extension-multi/visit-extension-multi.module.code.ts"
import { getCustomNameFromSymbol } from "../visit-identifier/visit-identifier.module.code.ts"
import { transformImportExpression } from "../visit-import/visit-import.module.code.ts"
import { transformOptionalChain } from "../visit-optional-chaining/visit-optional-chaining.module.code.ts"

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
      transformedContext = context.moveToPrecedingTemp(transformedContext, callContext)
    }
    call = context.moveToPrecedingTemp(call, callExpression)
    context.addPrecedingStatements(argPrecedingStatements)
  }

  const finalArguments: readonly luaExpressions.Expression[] = transformedContext
    ? [transformedContext, ...transformedArguments]
    : transformedArguments

  return [call, finalArguments]
}

function transformElementAccessCall(
  context: TransformationContext,
  left: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  transformedArguments: readonly luaExpressions.Expression[],
  argPrecedingStatements: readonly luaStatements.Statement[]
) {
  const selfIdentifier = luaExpressions.createIdentifier(context.createTempName("self"))
  const callContext = context.transformExpression(left.expression)
  const selfAssignment = luaStatements.createVariableDeclarationStatement(
    selfIdentifier,
    callContext
  )
  context.addPrecedingStatements(selfAssignment)

  const argument = ts.isElementAccessExpression(left)
    ? transformElementAccessArgument(context, left)
    : luaExpressions.createStringLiteral(left.name.text)

  let index: luaExpressions.Expression = luaExpressions.createTableIndexExpression(
    selfIdentifier,
    argument
  )

  if (argPrecedingStatements.length > 0) {
    index = context.moveToPrecedingTemp(index)
    context.addPrecedingStatements(argPrecedingStatements)
  }

  return luaExpressions.createCallExpression(index, [selfIdentifier, ...transformedArguments])
}

export function transformContextualCallExpression(
  context: TransformationContext,
  node: ts.CallExpression | ts.TaggedTemplateExpression,
  args: readonly ts.Expression[] | ts.NodeArray<ts.Expression>
): luaExpressions.Expression {
  if (ts.isOptionalChain(node)) {
    return transformOptionalChain(context, node)
  }
  const left = ts.isCallExpression(node) ? getCalledExpression(node) : node.tag

  let { precedingStatements: argPrecedingStatements, result: transformedArguments } =
    transformInPrecedingStatementScope(context, () => context.transformArguments(args))

  if (
    ts.isPropertyAccessExpression(left) &&
    ts.isIdentifier(left.name) &&
    isValidLuaIdentifier(left.name.text, context.options) &&
    argPrecedingStatements.length === 0
  ) {
    const table = context.transformExpression(left.expression)
    let name = left.name.text

    const symbol = context.checker.getSymbolAtLocation(left)
    const customName = getCustomNameFromSymbol(context, symbol)

    if (customName != null) {
      name = customName
    }

    return luaExpressions.createMethodCallExpression(
      table,
      luaExpressions.createIdentifier(name, left.name),
      transformedArguments,
      node
    )
  } else if (ts.isElementAccessExpression(left) || ts.isPropertyAccessExpression(left)) {
    if (isExpressionWithEvaluationEffect(left.expression)) {
      return transformElementAccessCall(context, left, transformedArguments, argPrecedingStatements)
    } else {
      let expression: luaExpressions.Expression
      ;[expression, transformedArguments] = transformCallWithArguments(
        context,
        left,
        transformedArguments,
        argPrecedingStatements,
        left.expression
      )
      return luaExpressions.createCallExpression(expression, transformedArguments, node)
    }
  } else if (ts.isIdentifier(left) || ts.isCallExpression(left)) {
    const callContext = context.isStrict
      ? ts.factory.createNull()
      : ts.factory.createIdentifier("_G")
    let expression: luaExpressions.Expression
    ;[expression, transformedArguments] = transformCallWithArguments(
      context,
      left,
      transformedArguments,
      argPrecedingStatements,
      callContext
    )
    return luaExpressions.createCallExpression(expression, transformedArguments, node)
  } else {
    throw new Error(`Unsupported LeftHandSideExpression kind: ${ts.SyntaxKind[left.kind]}`)
  }
}

function transformPropertyCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression {
  const signature = context.checker.getResolvedSignature(node)

  if (calledMethod.expression.kind === ts.SyntaxKind.SuperKeyword) {
    const parameters = context.transformArguments(
      node.arguments,
      signature,
      ts.factory.createThis()
    )
    return luaExpressions.createCallExpression(
      context.transformExpression(node.expression),
      parameters,
      node
    )
  }

  if (getCallContextType(context, node) !== ContextType.Void) {
    return transformContextualCallExpression(context, node, node.arguments)
  } else {
    const [callPath, parameters] = context.transformCallAndArguments(
      node.expression,
      node.arguments,
      signature
    )

    return luaExpressions.createCallExpression(callPath, parameters, node)
  }
}

function transformElementCall(
  context: TransformationContext,
  node: ts.CallExpression
): luaExpressions.Expression {
  if (getCallContextType(context, node) !== ContextType.Void) {
    return transformContextualCallExpression(context, node, node.arguments)
  } else {
    const [expression, parameters] = context.transformCallAndArguments(
      node.expression,
      node.arguments
    )
    return luaExpressions.createCallExpression(expression, parameters, node)
  }
}

export const transformCallExpression: FunctionVisitor<ts.CallExpression> = (node, context) => {
  const calledExpression = getCalledExpression(node)

  if (calledExpression.kind === ts.SyntaxKind.ImportKeyword) {
    return transformImportExpression(node, context)
  }

  if (ts.isOptionalChain(node)) {
    return transformOptionalChain(context, node)
  }

  const optionalContinuation = ts.isIdentifier(calledExpression)
    ? getOptionalContinuationData(calledExpression)
    : undefined
  const wrapResultInTable =
    isMultiReturnCall(context, node) && shouldMultiReturnCallBeWrapped(context, node)

  const builtinOrExtensionResult =
    transformBuiltinCallExpression(context, node) ??
    transformLanguageExtensionCallExpression(context, node)
  if (builtinOrExtensionResult) {
    if (optionalContinuation !== undefined) {
      context.addDiagnostic(unsupportedBuiltinOptionalCall(node))
    }
    return wrapResultInTable ? wrapInTable(builtinOrExtensionResult) : builtinOrExtensionResult
  }

  if (ts.isPropertyAccessExpression(calledExpression)) {
    const result = transformPropertyCall(context, node, calledExpression)
    return wrapResultInTable ? wrapInTable(result) : result
  }

  if (ts.isElementAccessExpression(calledExpression)) {
    const result = transformElementCall(context, node)
    return wrapResultInTable ? wrapInTable(result) : result
  }

  const signature = context.checker.getResolvedSignature(node)

  if (calledExpression.kind === ts.SyntaxKind.SuperKeyword) {
    const parameters = context.transformArguments(
      node.arguments,
      signature,
      ts.factory.createThis()
    )

    return luaExpressions.createCallExpression(
      luaExpressions.createTableIndexExpression(
        context.transformExpression(ts.factory.createSuper()),
        luaExpressions.createStringLiteral("____constructor")
      ),
      parameters,
      node
    )
  }

  let callPath: luaExpressions.Expression
  let parameters: readonly luaExpressions.Expression[]

  const isContextualCall = getCallContextType(context, node) !== ContextType.Void

  if (!isContextualCall) {
    ;[callPath, parameters] = context.transformCallAndArguments(
      calledExpression,
      node.arguments,
      signature
    )
  } else {
    const useGlobalContext = !context.isStrict && optionalContinuation === undefined
    const callContext = useGlobalContext
      ? ts.factory.createIdentifier("_G")
      : ts.factory.createNull()
    ;[callPath, parameters] = context.transformCallAndArguments(
      calledExpression,
      node.arguments,
      signature,
      callContext
    )
  }

  const callExpression = luaExpressions.createCallExpression(callPath, parameters, node)
  if (optionalContinuation && isContextualCall) {
    optionalContinuation.contextualCall = callExpression
  }
  return wrapResultInTable ? wrapInTable(callExpression) : callExpression
}
