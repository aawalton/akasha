import * as ts from "typescript"
import {
  moveToPrecedingTemp as moveToPrecedingTempImpl,
  shouldMoveToTemp as shouldMoveToTempImpl,
  transformArguments as transformArgumentsImpl,
  transformCallAndArguments as transformCallAndArgumentsImpl,
  transformExpressionList as transformExpressionListImpl,
  transformOrderedExpressions as transformOrderedExpressionsImpl,
} from "../context-dispatch-helpers/context-dispatch-helpers.module.code.ts"
import {
  assertAllStatements,
  assertIsExpression,
} from "../context-lua-node-assertions/context-lua-node-assertions.module.code.ts"
import { createTempNames } from "../context-temp-names/context-temp-names.module.code.ts"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type {
  ExpressionLikeNode,
  FunctionVisitor,
  StatementLikeNode,
  VisitorMap,
} from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { unsupportedNodeKind } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  type OneToManyVisitorResult,
  unwrapVisitorResult,
} from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import type { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import type { Scope, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"
import type { SymbolInfo } from "../tstl-symbols/tstl-symbols.module.code.ts"
import { assert, castArray } from "../tstl-utils/tstl-utils.module.code.ts"

export function createTransformationContext(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  visitorMap: VisitorMap
): TransformationContext {
  const checker = program.getTypeChecker()
  const options = program.getCompilerOptions()
  const luaTarget = options.luaTarget ?? LuaTarget.Universal
  const isModule = ts.isExternalModule(sourceFile)
  const isStrict =
    (options.alwaysStrict ?? options.strict ?? false) ||
    (isModule && options.target !== undefined && options.target >= ts.ScriptTarget.ES2015)

  const originalSourceFile = ts.getParseTreeNode(sourceFile, ts.isSourceFile) ?? sourceFile
  const resolver = checker.getEmitResolver(originalSourceFile)

  const diagnostics: ts.Diagnostic[] = []
  const precedingStatementsStack: luaStatements.Statement[][] = []
  const usedLuaLibFeatures = new Set<LuaLibFeature>()
  const symbolInfoMap = new Map<luaCore.SymbolId, SymbolInfo>()
  const symbolIdMaps = new Map<ts.Symbol, luaCore.SymbolId>()
  const scopeStack: Scope[] = []

  let currentNodeVisitors: ReadonlyArray<FunctionVisitor<ts.Node>> = []
  let currentNodeVisitorsIndex = 0
  const { createTempName, createTempNameForLuaExpression, createTempNameForNode } =
    createTempNames()
  let lastSymbolId = 0
  let lastScopeId = 0

  function transformNodeRaw(
    node: ts.Node,
    isExpression?: boolean
  ): OneToManyVisitorResult<luaCore.Node> {
    if (
      ts.canHaveModifiers(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DeclareKeyword)
    ) {
      return []
    }

    const nodeVisitors = visitorMap.get(node.kind)
    if (!nodeVisitors) {
      diagnostics.push(unsupportedNodeKind(node, node.kind))
      return isExpression ? [luaExpressions.createNilLiteral()] : []
    }

    const previousNodeVisitors = currentNodeVisitors
    const previousNodeVisitorsIndex = currentNodeVisitorsIndex
    currentNodeVisitors = nodeVisitors
    currentNodeVisitorsIndex = nodeVisitors.length - 1

    const visitor = currentNodeVisitors[currentNodeVisitorsIndex]
    if (visitor === undefined) {
      throw new Error(
        `No visitor at index ${currentNodeVisitorsIndex} for ${ts.SyntaxKind[node.kind]}`
      )
    }
    const result = visitor(node, context)

    currentNodeVisitors = previousNodeVisitors
    currentNodeVisitorsIndex = previousNodeVisitorsIndex

    return result
  }

  function transformNode(node: ts.Node): readonly luaCore.Node[] {
    return unwrapVisitorResult(transformNodeRaw(node))
  }

  function doSuperTransformNode(node: ts.Node): OneToManyVisitorResult<luaCore.Node> {
    if (--currentNodeVisitorsIndex < 0) {
      throw new Error(`There is no super transform for ${ts.SyntaxKind[node.kind]} visitor`)
    }

    const visitor = currentNodeVisitors[currentNodeVisitorsIndex]
    if (visitor === undefined) {
      throw new Error(
        `No super-transform visitor at index ${currentNodeVisitorsIndex} for ${ts.SyntaxKind[node.kind]}`
      )
    }
    return unwrapVisitorResult(visitor(node, context))
  }

  function superTransformNode(node: ts.Node): readonly luaCore.Node[] {
    return unwrapVisitorResult(doSuperTransformNode(node))
  }

  function transformExpression(node: ExpressionLikeNode): luaExpressions.Expression {
    const result = transformNodeRaw(node, true)
    return assertIsExpression(node, result)
  }

  function superTransformExpression(node: ExpressionLikeNode): luaExpressions.Expression {
    const result = doSuperTransformNode(node)
    return assertIsExpression(node, result)
  }

  function transformStatements(
    node: StatementLikeNode | readonly StatementLikeNode[]
  ): readonly luaStatements.Statement[] {
    return castArray(node).flatMap((n) => {
      pushPrecedingStatements()
      const statements = transformNode(n)
      assertAllStatements(n, statements)
      const result: luaStatements.Statement[] = [...popPrecedingStatements()]
      result.push(...statements)
      return result
    })
  }

  function superTransformStatements(
    node: StatementLikeNode | readonly StatementLikeNode[]
  ): readonly luaStatements.Statement[] {
    return castArray(node).flatMap((n) => {
      pushPrecedingStatements()
      const statements = superTransformNode(n)
      assertAllStatements(n, statements)
      const result: luaStatements.Statement[] = [...popPrecedingStatements()]
      result.push(...statements)
      return result
    })
  }

  function pushPrecedingStatements(): undefined {
    precedingStatementsStack.push([])
  }

  function popPrecedingStatements(): readonly luaStatements.Statement[] {
    const precedingStatements = precedingStatementsStack.pop()
    assert(precedingStatements)
    return precedingStatements
  }

  function addPrecedingStatements(
    statements: luaStatements.Statement | readonly luaStatements.Statement[]
  ): undefined {
    const precedingStatements = precedingStatementsStack[precedingStatementsStack.length - 1]
    assert(precedingStatements)
    const items: readonly luaStatements.Statement[] = castArray(statements)
    precedingStatements.push(...items)
  }

  function prependPrecedingStatements(
    statements: luaStatements.Statement | readonly luaStatements.Statement[]
  ): undefined {
    const precedingStatements = precedingStatementsStack[precedingStatementsStack.length - 1]
    assert(precedingStatements)
    const items: readonly luaStatements.Statement[] = castArray(statements)
    precedingStatements.unshift(...items)
  }

  function addDiagnostic(diagnostic: ts.Diagnostic): undefined {
    diagnostics.push(diagnostic)
  }

  function nextSymbolId(): luaCore.SymbolId {
    return luaCore.SymbolId(++lastSymbolId)
  }

  function pushScope(type: ScopeType, node: ts.Node): Scope {
    const scope: Scope = { type, id: ++lastScopeId, node }
    scopeStack.push(scope)
    return scope
  }

  function popScope(): Scope {
    const scope = scopeStack.pop()
    assert(scope)
    return scope
  }

  function transformArguments(
    params: readonly ts.Expression[],
    signature?: ts.Signature,
    callContext?: ts.Expression
  ): readonly luaExpressions.Expression[] {
    return transformArgumentsImpl(context, params, signature, callContext)
  }

  function transformCallAndArguments(
    callExpression: ts.Expression,
    params: readonly ts.Expression[],
    signature?: ts.Signature,
    callContext?: ts.Expression
  ): readonly [luaExpressions.Expression, readonly luaExpressions.Expression[]] {
    return transformCallAndArgumentsImpl(context, callExpression, params, signature, callContext)
  }

  function transformExpressionList(
    expressions: readonly ts.Expression[]
  ): readonly luaExpressions.Expression[] {
    return transformExpressionListImpl(context, expressions)
  }

  function transformOrderedExpressions(
    expressions: readonly ts.Expression[]
  ): readonly luaExpressions.Expression[] {
    return transformOrderedExpressionsImpl(context, expressions)
  }

  function moveToPrecedingTemp(
    expression: luaExpressions.Expression,
    tsOriginal?: ts.Node
  ): luaExpressions.Expression {
    return moveToPrecedingTempImpl(context, expression, tsOriginal)
  }

  function shouldMoveToTemp(expression: luaExpressions.Expression, tsOriginal?: ts.Node): boolean {
    return shouldMoveToTempImpl(context, expression, tsOriginal)
  }

  const context: TransformationContext = {
    program,
    sourceFile,
    diagnostics,
    checker,
    resolver,
    precedingStatementsStack,
    options,
    luaTarget,
    isModule,
    isStrict,
    usedLuaLibFeatures,
    symbolInfoMap,
    symbolIdMaps,
    scopeStack,
    currentNamespaces: undefined,
    classSuperInfos: [],
    transformNode,
    transformNodeRaw,
    superTransformNode,
    transformExpression,
    superTransformExpression,
    transformStatements,
    superTransformStatements,
    transformArguments,
    transformCallAndArguments,
    transformExpressionList,
    transformOrderedExpressions,
    moveToPrecedingTemp,
    shouldMoveToTemp,
    pushPrecedingStatements,
    popPrecedingStatements,
    addPrecedingStatements,
    prependPrecedingStatements,
    addDiagnostic,
    createTempName,
    createTempNameForLuaExpression,
    createTempNameForNode,
    nextSymbolId,
    pushScope,
    popScope,
  }

  return context
}
