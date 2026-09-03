import type ts from "typescript"
import { goneRecord, oldGraphGone } from "../old-graph-gone/old-graph-gone.module.code.ts"
import { nodeId, nodeIdPrefix } from "../old-graph-node-keys/old-graph-node-keys.module.code.ts"

export type ParsedImports = unknown

export const flatImportsFromParsed = ((...a: readonly unknown[]) =>
  oldGraphGone("flatImportsFromParsed")) as never
export const parseFileFromText = ((...a: readonly unknown[]) =>
  oldGraphGone("parseFileFromText")) as never

export type MockModuleFactoryAnalysis =
  | {
      readonly kind: "object-literal"
      readonly factoryKeys: readonly string[]
      readonly delegatedKeys: readonly string[]
    }
  | { readonly kind: "unanalyzable"; readonly reason: string }

export type ParsedMockModuleCall =
  | {
      readonly specifierKind: "literal"
      readonly specifier: string
      readonly line: number
      readonly factory: MockModuleFactoryAnalysis
    }
  | {
      readonly specifierKind: "unreadable"
      readonly specifierText: string
      readonly line: number
    }

export const MockModuleAttrsSchema = goneRecord("MockModuleAttrsSchema")
export const MockModuleUnreadableSpecifierAttrsSchema = goneRecord(
  "MockModuleUnreadableSpecifierAttrsSchema"
)
export const visitForMockModuleCalls: (
  sourceFile: ts.SourceFile
) => readonly ParsedMockModuleCall[] = () => oldGraphGone("visitForMockModuleCalls")

export type TsFileDiscoveredVia =
  | "tsconfig"
  | "tsconfig-include-only"
  | "adapter"
  | "entry-glob"
  | "workspace-walk"

export type TsFileExportKind =
  | "function"
  | "const"
  | "let"
  | "var"
  | "class"
  | "interface"
  | "type"
  | "enum"
  | "namespace"
  | "reexport"
  | "default"

export type TsFileExport = {
  readonly name: string
  readonly line: number
  readonly kind: TsFileExportKind
  readonly typeOnly: boolean
  readonly signatureTypeRefs?: readonly string[]
}

export type TsFileImportKind =
  | "static"
  | "dynamic"
  | "re-export"
  | "jsdoc-import"
  | "triple-slash-ref"

export type TsFileImport = {
  readonly specifier: string
  readonly typeOnly: boolean
  readonly kind: TsFileImportKind
}

export type TsFileAttrs = {
  readonly path: string
  readonly ext: ".ts" | ".tsx"
  readonly package: string
  readonly workspaceRoot: string
  readonly discoveredVia: TsFileDiscoveredVia
  readonly exports: readonly TsFileExport[]
  readonly imports: readonly TsFileImport[]
  readonly parsedImports?: ParsedImports
  readonly mockModuleCalls?: readonly ParsedMockModuleCall[]
}

export type ImportedSymbol = string | "*" | null

export type ImportStaticAttrs = {
  readonly specifier: string
  readonly resolved: string | null
  readonly typeOnly: boolean
  readonly importedSymbols: readonly ImportedSymbol[]
}

export type ImportDynamicAttrs = {
  readonly specifier: string
  readonly resolved: string | null
}

export type ReExportAttrs = {
  readonly specifier: string
  readonly resolved: string | null
  readonly typeOnly: boolean
  readonly importedSymbols: readonly ImportedSymbol[]
  readonly reexportLocalNames: readonly (string | null)[] | null
}

export type TsFileNodeType = "ts-file"
export type TsxFileNodeType = "tsx-file"
export type ImportStaticEdgeType = "import-static"
export type ImportDynamicEdgeType = "import-dynamic"
export type ReExportEdgeType = "re-export"
export type MockModuleEdgeType = "mock-module"
export type MockModuleUnreadableSpecifierEdgeType = "mock-module-unreadable-specifier"
export type ImportReferencePathEdgeType = "import-reference-path"

export const TS_FILE_NODE_TYPE: TsFileNodeType = "ts-file"
export const TSX_FILE_NODE_TYPE: TsxFileNodeType = "tsx-file"
export const TS_FILE_NODE_TYPES = [TS_FILE_NODE_TYPE, TSX_FILE_NODE_TYPE] as const
export const IMPORT_STATIC_EDGE_TYPE: ImportStaticEdgeType = "import-static"
export const IMPORT_DYNAMIC_EDGE_TYPE: ImportDynamicEdgeType = "import-dynamic"
export const RE_EXPORT_EDGE_TYPE: ReExportEdgeType = "re-export"
export const MOCK_MODULE_EDGE_TYPE: MockModuleEdgeType = "mock-module"
export const MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE: MockModuleUnreadableSpecifierEdgeType =
  "mock-module-unreadable-specifier"
export const IMPORT_REFERENCE_PATH_EDGE_TYPE: ImportReferencePathEdgeType = "import-reference-path"

export type ImportReferencePathAttrs = {
  readonly specifier: string
  readonly resolved: string
}

export const tsFileNodeTypeOf = (repoRel: string): TsFileNodeType | TsxFileNodeType =>
  repoRel.endsWith(".tsx") ? TSX_FILE_NODE_TYPE : TS_FILE_NODE_TYPE

export const TS_FILE_NODE_ID_PREFIX = nodeIdPrefix(TS_FILE_NODE_TYPE)
export const TSX_FILE_NODE_ID_PREFIX = nodeIdPrefix(TSX_FILE_NODE_TYPE)

export const tsFileNodeId = (repoRel: string): string => nodeId(tsFileNodeTypeOf(repoRel), repoRel)

export const tsFileNodeIdToCodeRepoRel = (id: string): string | null => {
  if (id.startsWith(TSX_FILE_NODE_ID_PREFIX)) return id.slice(TSX_FILE_NODE_ID_PREFIX.length)
  if (id.startsWith(TS_FILE_NODE_ID_PREFIX)) return id.slice(TS_FILE_NODE_ID_PREFIX.length)
  return null
}
