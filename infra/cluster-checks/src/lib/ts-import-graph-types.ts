export type AdapterRole = "entry" | "transit" | "source" | "ignore"

export interface FrameworkAdapter {
  name: string
  pattern: string
  role: AdapterRole
}

export interface WorkspaceConfig {
  root: string
  entries: readonly string[]
  project: readonly string[]
  ignore: readonly string[]
  tsconfigPath: string
  audited: boolean
}

export interface GraphConfig {
  repoRoot: string
  workspaces: readonly WorkspaceConfig[]
  adapters: readonly FrameworkAdapter[]
}

export type ExportKind =
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

export interface ModuleExport {
  name: string
  line: number
  kind: ExportKind
  typeOnly: boolean
  signatureTypeRefs?: readonly string[]
}

export interface ModuleImport {
  specifier: string
  resolvedPath: string | null
  importedNames: readonly (string | "*" | null)[]
  reexportLocalNames?: readonly (string | "*" | null)[]
  typeOnly: boolean
  dynamic: boolean
  isReexport: boolean
  line: number
}

export interface ModulePragmas {
  file: { reason: string; line: number } | null
  lines: Map<number, { reason: string }>
  invalid: readonly { line: number; kind: "line" | "file" }[]
}

export interface ModuleNode {
  filePath: string
  relPath: string
  workspaceRoot: string
  role: AdapterRole
  exports: readonly ModuleExport[]
  imports: readonly ModuleImport[]
  pragmas: ModulePragmas
  consumerOnly?: boolean
}

export interface ModuleGraph {
  modules: Map<string, ModuleNode>
  entries: Set<string>
  warnings: readonly string[]
  externalRoots?: ReadonlySet<string>
}

export type DiagnosticKind = "UnusedExport" | "PragmaValidationError"

export interface UnusedExportDiagnostic {
  kind: DiagnosticKind
  filePath: string
  relPath: string
  line: number
  exportName: string
  exportKind: ExportKind
  reason: string
}

export interface KnipWorkspaceEntry {
  entry?: readonly string[]
  project?: readonly string[]
  ignore?: readonly string[]
}

export interface KnipRoot {
  workspaces?: Record<string, KnipWorkspaceEntry>
  ignoreWorkspaces?: readonly string[]
}

export interface CollectedExports {
  exports: readonly ModuleExport[]
}

export interface ParsedWorkspace {
  ws: WorkspaceConfig
  host: import("typescript").CompilerHost
  options: import("typescript").CompilerOptions
  fileNames: readonly string[]
  tsconfigExcludes: readonly string[]
}
