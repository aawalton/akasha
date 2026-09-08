import type * as ts from "typescript"
import type {
  CompilerOptions,
  LuaTarget,
} from "../compiler-options/compiler-options.module.code.ts"
import type {
  ExpressionLikeNode,
  StatementLikeNode,
} from "../context-visitors/context-visitors.module.code.ts"
import type * as luaCore from "../lua-ast-core/lua-ast-core.module.code.ts"
import type { LuaLibFeature } from "../lualib-features/lualib-features.module.code.ts"
import type { Scope, ScopeType } from "../scope/scope.module.code.ts"
import type { SymbolInfo } from "../symbols/symbols.module.code.ts"
import type { OneToManyVisitorResult } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import type { ClassSuperInfo } from "../visitors-class/visitors-class.module.code.ts"

export interface AllAccessorDeclarations {
  firstAccessor: ts.AccessorDeclaration
  getAccessor: ts.GetAccessorDeclaration | undefined
  setAccessor: ts.SetAccessorDeclaration | undefined
}

export interface TransformationContext {
  readonly program: ts.Program
  readonly sourceFile: ts.SourceFile
  readonly diagnostics: readonly ts.Diagnostic[]
  readonly checker: ts.TypeChecker
  readonly resolver: ts.EmitResolver
  readonly precedingStatementsStack: readonly (readonly luaStatements.Statement[])[]
  readonly options: CompilerOptions
  readonly luaTarget: LuaTarget
  readonly isModule: boolean
  readonly isStrict: boolean
  readonly usedLuaLibFeatures: Set<LuaLibFeature>
  readonly symbolInfoMap: Map<luaCore.SymbolId, SymbolInfo>
  readonly symbolIdMaps: Map<ts.Symbol, luaCore.SymbolId>
  readonly scopeStack: readonly Scope[]

  currentNamespaces: ts.ModuleDeclaration | undefined
  classSuperInfos: readonly ClassSuperInfo[]

  transformNode: (node: ts.Node) => readonly luaCore.Node[]
  transformNodeRaw: (node: ts.Node, isExpression?: boolean) => OneToManyVisitorResult<luaCore.Node>
  superTransformNode: (node: ts.Node) => readonly luaCore.Node[]
  transformExpression: (node: ExpressionLikeNode) => luaExpressions.Expression
  superTransformExpression: (node: ExpressionLikeNode) => luaExpressions.Expression
  transformStatements: (
    node: StatementLikeNode | readonly StatementLikeNode[]
  ) => readonly luaStatements.Statement[]
  superTransformStatements: (
    node: StatementLikeNode | readonly StatementLikeNode[]
  ) => readonly luaStatements.Statement[]

  transformArguments: (
    params: readonly ts.Expression[],
    signature?: ts.Signature,
    callContext?: ts.Expression
  ) => readonly luaExpressions.Expression[]
  transformCallAndArguments: (
    callExpression: ts.Expression,
    params: readonly ts.Expression[],
    signature?: ts.Signature,
    callContext?: ts.Expression
  ) => readonly [luaExpressions.Expression, readonly luaExpressions.Expression[]]
  transformExpressionList: (
    expressions: readonly ts.Expression[]
  ) => readonly luaExpressions.Expression[]
  transformOrderedExpressions: (
    expressions: readonly ts.Expression[]
  ) => readonly luaExpressions.Expression[]
  moveToPrecedingTemp: (
    expression: luaExpressions.Expression,
    tsOriginal?: ts.Node
  ) => luaExpressions.Expression
  shouldMoveToTemp: (expression: luaExpressions.Expression, tsOriginal?: ts.Node) => boolean

  pushPrecedingStatements: () => void
  popPrecedingStatements: () => readonly luaStatements.Statement[]
  addPrecedingStatements: (
    statements: luaStatements.Statement | readonly luaStatements.Statement[]
  ) => void
  prependPrecedingStatements: (
    statements: luaStatements.Statement | readonly luaStatements.Statement[]
  ) => void

  addDiagnostic: (diagnostic: ts.Diagnostic) => undefined

  createTempName: (prefix?: string) => string
  createTempNameForLuaExpression: (
    expression: luaExpressions.Expression
  ) => luaExpressions.Identifier
  createTempNameForNode: (node: ts.Node) => luaExpressions.Identifier

  nextSymbolId: () => luaCore.SymbolId

  pushScope: (type: ScopeType, node: ts.Node) => Scope
  popScope: () => Scope
}
