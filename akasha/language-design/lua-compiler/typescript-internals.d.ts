import "typescript"

declare module "typescript" {
  function createDiagnosticReporter(system: System, pretty?: boolean): DiagnosticReporter
  function createWatchStatusReporter(system: System, pretty?: boolean): WatchStatusReporter

  function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression
  function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node
  function isOuterExpression(
    node: Node | undefined,
    kinds?: OuterExpressionKinds
  ): node is Expression
  function setParent<T extends Node>(child: T, parent: Node | undefined): T
  function setParent<T extends Node>(child: T | undefined, parent: Node | undefined): T | undefined

  function transformJsx(context: TransformationContext): Transformer<SourceFile>

  function pathIsAbsolute(path: string): boolean
  function pathIsRelative(path: string): boolean
  function nodeNextJsonConfigResolver(
    moduleName: string,
    containingFile: string,
    host: ModuleResolutionHost
  ): ResolvedModuleWithFailedLookupLocations

  interface Symbol {
    readonly parent?: Symbol
  }

  interface Statement {
    readonly jsDoc?: readonly JSDoc[]
  }

  interface Signature {
    readonly compositeSignatures?: readonly Signature[]
  }

  interface TypeChecker {
    getElementTypeOfArrayType(type: Type): Type | undefined
    getContextualTypeForObjectLiteralElement(node: ObjectLiteralElementLike): Type | undefined
    getEmitResolver(sourceFile?: SourceFile, cancellationToken?: CancellationToken): EmitResolver
  }

  interface EmitResolver {
    isValueAliasDeclaration(node: Node): boolean
    isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean
    isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean
  }

  interface Program {
    getCommonSourceDirectory(): string
    getCompilerOptions(): import("../CompilerOptions").CompilerOptions
  }

  interface Node {
    symbol?: Symbol
  }

  interface Type {
    objectFlags?: ObjectFlags
  }

  interface System {
    setBlocking?(): void
  }

  interface CompilerOptions {
    configFilePath?: string
    configFile?: TsConfigSourceFile
  }
}
