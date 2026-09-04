import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  createDefaultExportStringLiteral,
  hasDefaultExportModifier,
} from "../tstl-export/tstl-export.module.code.ts"
import { createExportsIdentifier } from "../tstl-exports-identifier/tstl-exports-identifier.module.code.ts"
import {
  ContextType,
  getFunctionContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import {
  createLocalOrExportedOrGlobalDeclaration,
  createSelfIdentifier,
  wrapInTable,
} from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import {
  peekScope,
  performHoisting,
  type Scope,
  ScopeType,
} from "../tstl-scope/tstl-scope.module.code.ts"
import { assert } from "../tstl-utils/tstl-utils.module.code.ts"
import {
  isAsyncFunction,
  wrapInAsyncAwaiter,
} from "../visit-async-await/visit-async-await.module.code.ts"
import {
  createCallableTable,
  isFunctionTypeWithProperties,
} from "../visit-function-shape/visit-function-shape.module.code.ts"
import { transformIdentifier } from "../visit-identifier/visit-identifier.module.code.ts"
import { transformExpressionBodyToReturnStatement } from "../visit-return/visit-return.module.code.ts"
import { transformBindingPattern } from "../visit-variable-declaration/visit-variable-declaration.module.code.ts"

function transformParameterDefaultValueDeclaration(
  context: TransformationContext,
  parameterName: luaExpressions.Identifier,
  value: ts.Expression,
  tsOriginal?: ts.Node
): luaStatements.Statement | undefined {
  const { precedingStatements: rawStatements, result: parameterValue } =
    transformInPrecedingStatementScope(context, () => context.transformExpression(value))
  const statements: readonly luaStatements.Statement[] = luaExpressions.isNilLiteral(parameterValue)
    ? rawStatements
    : [...rawStatements, luaStatements.createAssignmentStatement(parameterName, parameterValue)]
  if (statements.length === 0) return undefined

  const nilCondition = luaExpressions.createBinaryExpression(
    parameterName,
    luaExpressions.createNilLiteral(),
    luaCore.SyntaxKind.EqualityOperator
  )

  const ifBlock = luaStatements.createBlock(statements, tsOriginal)

  return luaStatements.createIfStatement(nilCondition, ifBlock, undefined, tsOriginal)
}

function isRestParameterReferenced(identifier: luaExpressions.Identifier, scope: Scope): boolean {
  if (!identifier.symbolId) {
    return true
  }
  if (scope.referencedSymbols === undefined) {
    return false
  }
  const references = scope.referencedSymbols.get(identifier.symbolId)
  return references !== undefined && references.length > 0
}

export function transformFunctionBodyContent(
  context: TransformationContext,
  body: ts.ConciseBody
): readonly luaStatements.Statement[] {
  if (!ts.isBlock(body)) {
    const { precedingStatements, result: returnStatement } = transformInPrecedingStatementScope(
      context,
      () => transformExpressionBodyToReturnStatement(context, body)
    )
    return [...precedingStatements, returnStatement]
  }

  const bodyStatements = performHoisting(context, context.transformStatements(body.statements))
  return bodyStatements
}

export function transformFunctionBodyHeader(
  context: TransformationContext,
  bodyScope: Scope,
  parameters: ts.NodeArray<ts.ParameterDeclaration>,
  spreadIdentifier?: luaExpressions.Identifier
): readonly luaStatements.Statement[] {
  const headerStatements: luaStatements.Statement[] = []

  const bindingPatternDeclarations: luaStatements.Statement[] = []
  let bindPatternIndex = 0
  for (const declaration of parameters) {
    if (ts.isObjectBindingPattern(declaration.name) || ts.isArrayBindingPattern(declaration.name)) {
      const identifier = luaExpressions.createIdentifier(`____bindingPattern${bindPatternIndex++}`)
      if (declaration.initializer !== undefined) {
        const initializer = transformParameterDefaultValueDeclaration(
          context,
          identifier,
          declaration.initializer
        )
        if (initializer) headerStatements.push(initializer)
      }

      const name = declaration.name
      const { precedingStatements, result: bindings } = transformInPrecedingStatementScope(
        context,
        () => transformBindingPattern(context, name, identifier)
      )
      bindingPatternDeclarations.push(...precedingStatements, ...bindings)
    } else if (declaration.initializer !== undefined) {
      const initializer = transformParameterDefaultValueDeclaration(
        context,
        transformIdentifier(context, declaration.name),
        declaration.initializer
      )
      if (initializer) headerStatements.push(initializer)
    }
  }

  if (spreadIdentifier && isRestParameterReferenced(spreadIdentifier, bodyScope)) {
    const spreadTable =
      context.luaTarget === LuaTarget.Lua50
        ? luaExpressions.createArgLiteral()
        : wrapInTable(luaExpressions.createDotsLiteral())
    headerStatements.push(
      luaStatements.createVariableDeclarationStatement(spreadIdentifier, spreadTable)
    )
  }

  headerStatements.push(...bindingPatternDeclarations)

  return headerStatements
}

export function transformFunctionBody(
  context: TransformationContext,
  parameters: ts.NodeArray<ts.ParameterDeclaration>,
  body: ts.ConciseBody,
  node: ts.FunctionLikeDeclaration,
  spreadIdentifier?: luaExpressions.Identifier
): readonly [readonly luaStatements.Statement[], Scope] {
  const scope = context.pushScope(ScopeType.Function, node)
  let bodyStatements = transformFunctionBodyContent(context, body)
  if (node && isAsyncFunction(node)) {
    bodyStatements = [
      luaStatements.createReturnStatement([wrapInAsyncAwaiter(context, bodyStatements)]),
    ]
  }
  const headerStatements = transformFunctionBodyHeader(context, scope, parameters, spreadIdentifier)
  context.popScope()
  return [[...headerStatements, ...bodyStatements], scope]
}

export function transformParameters(
  context: TransformationContext,
  parameters: ts.NodeArray<ts.ParameterDeclaration>,
  functionContext?: luaExpressions.Identifier
): readonly [
  readonly luaExpressions.Identifier[],
  luaExpressions.DotsLiteral | undefined,
  luaExpressions.Identifier | undefined,
] {
  const paramNames: luaExpressions.Identifier[] = []
  if (functionContext) {
    paramNames.push(functionContext)
  }

  let restParamName: luaExpressions.Identifier | undefined
  let dotsLiteral: luaExpressions.DotsLiteral | undefined
  let identifierIndex = 0

  for (const param of parameters) {
    if (
      ts.isIdentifier(param.name) &&
      ts.identifierToKeywordKind(param.name) === ts.SyntaxKind.ThisKeyword
    ) {
      continue
    }

    const paramName =
      ts.isObjectBindingPattern(param.name) || ts.isArrayBindingPattern(param.name)
        ? luaExpressions.createIdentifier(`____bindingPattern${identifierIndex++}`)
        : transformIdentifier(context, param.name)

    if (!param.dotDotDotToken) {
      paramNames.push(paramName)
    } else {
      restParamName = paramName
      dotsLiteral = luaExpressions.createDotsLiteral()
    }
  }

  return [paramNames, dotsLiteral, restParamName]
}

export function transformFunctionToExpression(
  context: TransformationContext,
  node: ts.FunctionLikeDeclaration
): readonly [luaExpressions.Expression, Scope] {
  assert(node.body)

  const type = context.checker.getTypeAtLocation(node)
  let functionContext: luaExpressions.Identifier | undefined

  const firstParam = node.parameters[0]
  const hasThisVoidParameter =
    firstParam &&
    ts.isIdentifier(firstParam.name) &&
    ts.identifierToKeywordKind(firstParam.name) === ts.SyntaxKind.ThisKeyword &&
    firstParam.type?.kind === ts.SyntaxKind.VoidKeyword

  if (!hasThisVoidParameter && getFunctionContextType(context, type) !== ContextType.Void) {
    if (ts.isArrowFunction(node)) {
      if (node.parameters.length > 0) {
        functionContext = luaExpressions.createAnonymousIdentifier()
      }
    } else {
      functionContext = createSelfIdentifier()
    }
  }

  let flags = luaCore.NodeFlags.None
  if (!ts.isBlock(node.body)) flags |= luaCore.NodeFlags.Inline
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
    flags |= luaCore.NodeFlags.Declaration
  }

  const [paramNames, dotsLiteral, spreadIdentifier] = transformParameters(
    context,
    node.parameters,
    functionContext
  )
  const [transformedBody, functionScope] = transformFunctionBody(
    context,
    node.parameters,
    node.body,
    node,
    spreadIdentifier
  )

  const functionExpression = luaExpressions.createFunctionExpression(
    luaStatements.createBlock(transformedBody),
    paramNames,
    dotsLiteral,
    flags,
    node
  )

  return [
    node.asteriskToken
      ? transformLuaLibFunction(context, LuaLibFeature.Generator, undefined, functionExpression)
      : functionExpression,
    functionScope,
  ]
}

export function transformFunctionLikeDeclaration(
  node: ts.FunctionLikeDeclaration,
  context: TransformationContext
): luaExpressions.Expression {
  if (node.body === undefined) {
    return luaExpressions.createNilLiteral()
  }

  const [functionExpression, functionScope] = transformFunctionToExpression(context, node)

  const isNamedFunctionExpression = ts.isFunctionExpression(node) && node.name
  if (isNamedFunctionExpression && functionScope.referencedSymbols) {
    const symbol = context.checker.getSymbolAtLocation(node.name)
    if (symbol) {
      const isReferenced = [...functionScope.referencedSymbols].some(([, nodes]) =>
        nodes.some(
          (n) =>
            context.checker.getSymbolAtLocation(n)?.valueDeclaration === symbol.valueDeclaration
        )
      )

      if (isReferenced) {
        const nameIdentifier = transformIdentifier(context, node.name)
        if (isFunctionTypeWithProperties(context, context.checker.getTypeAtLocation(node))) {
          context.addPrecedingStatements([
            luaStatements.createVariableDeclarationStatement(nameIdentifier),
            luaStatements.createAssignmentStatement(
              nameIdentifier,
              createCallableTable(functionExpression)
            ),
          ])
        } else {
          context.addPrecedingStatements(
            luaStatements.createVariableDeclarationStatement(nameIdentifier, functionExpression)
          )
        }
        return luaExpressions.cloneIdentifier(nameIdentifier)
      }
    }
  }

  return isNamedFunctionExpression &&
    isFunctionTypeWithProperties(context, context.checker.getTypeAtLocation(node))
    ? createCallableTable(functionExpression)
    : functionExpression
}

export const transformFunctionDeclaration: FunctionVisitor<ts.FunctionDeclaration> = (
  node,
  context
) => {
  if (node.body === undefined) {
    return undefined
  }

  if (hasDefaultExportModifier(node)) {
    return luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(
        createExportsIdentifier(),
        createDefaultExportStringLiteral(node)
      ),
      transformFunctionLikeDeclaration(node, context)
    )
  }

  const [functionExpression, functionScope] = transformFunctionToExpression(context, node)

  const name = node.name
    ? transformIdentifier(context, node.name)
    : luaExpressions.createAnonymousIdentifier()

  if (name.symbolId !== undefined) {
    const scope = peekScope(context)
    scope.functionDefinitions ??= new Map()

    const functionInfo = { referencedSymbols: functionScope.referencedSymbols ?? new Map() }
    scope.functionDefinitions.set(name.symbolId, functionInfo)
  }

  const wrappedFunction =
    node.name && isFunctionTypeWithProperties(context, context.checker.getTypeAtLocation(node.name))
      ? createCallableTable(functionExpression)
      : functionExpression

  return createLocalOrExportedOrGlobalDeclaration(context, name, wrappedFunction, node)
}

export const transformYieldExpression: FunctionVisitor<ts.YieldExpression> = (
  expression,
  context
) => {
  const parameters = expression.expression
    ? [context.transformExpression(expression.expression)]
    : []
  return expression.asteriskToken
    ? transformLuaLibFunction(context, LuaLibFeature.DelegatedYield, expression, ...parameters)
    : luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("coroutine"),
          luaExpressions.createStringLiteral("yield")
        ),
        parameters,
        expression
      )
}
