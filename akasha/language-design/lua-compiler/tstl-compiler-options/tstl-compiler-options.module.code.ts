import type * as ts from "typescript"
import { JsxEmit } from "typescript"
import * as diagnosticFactories from "../transpile-diagnostics/transpile-diagnostics.module.code.ts"
import type { Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"

type OmitIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

export interface LuaPluginImport {
  name: string
  import?: string

  [option: string]: any
}

export interface InMemoryLuaPlugin {
  plugin: Plugin | ((options: Record<string, any>) => Plugin)
  [option: string]: any
}

export interface TstlOptions {
  buildMode?: BuildMode
  extension?: string
  luaBundle?: string
  luaBundleEntry?: string
  luaTarget?: LuaTarget
  luaLibImport?: LuaLibImportKind
  luaPlugins?: ReadonlyArray<LuaPluginImport | InMemoryLuaPlugin>
  noImplicitGlobalVariables?: boolean
  noImplicitSelf?: boolean
  noResolvePaths?: readonly string[]
  sourceMapTraceback?: boolean
  tstlVerbose?: boolean
  lua51AllowTryCatchInAsyncAwait?: boolean
  measurePerformance?: boolean
}

export type CompilerOptions = OmitIndexSignature<ts.CompilerOptions> &
  TstlOptions & {
    [option: string]: any
  }

export const LuaLibImportKind = {
  None: "none",
  Inline: "inline",
  Require: "require",
  RequireMinimal: "require-minimal",
} as const
export type LuaLibImportKind = (typeof LuaLibImportKind)[keyof typeof LuaLibImportKind]

export const LuaTarget = {
  Universal: "universal",
  Lua50: "5.0",
  Lua51: "5.1",
  Lua52: "5.2",
  Lua53: "5.3",
  Lua54: "5.4",
  Lua55: "5.5",
  LuaJIT: "JIT",
  Luau: "Luau",
} as const
export type LuaTarget = (typeof LuaTarget)[keyof typeof LuaTarget]

export const BuildMode = {
  Default: "default",
  Library: "library",
} as const
export type BuildMode = (typeof BuildMode)[keyof typeof BuildMode]

export const isBundleEnabled = (options: CompilerOptions) =>
  options.luaBundle !== undefined && options.luaBundleEntry !== undefined

export function validateOptions(options: CompilerOptions): readonly ts.Diagnostic[] {
  const diagnostics: ts.Diagnostic[] = []

  if (options.luaBundle != null && options.luaBundle !== "" && options.luaBundleEntry == null) {
    diagnostics.push(diagnosticFactories.luaBundleEntryIsRequired())
  }

  if (
    options.luaBundle != null &&
    options.luaBundle !== "" &&
    options.luaLibImport === LuaLibImportKind.Inline
  ) {
    diagnostics.push(diagnosticFactories.usingLuaBundleWithInlineMightGenerateDuplicateCode())
  }

  if (
    options.luaBundle != null &&
    options.luaBundle !== "" &&
    options.buildMode === BuildMode.Library
  ) {
    diagnostics.push(diagnosticFactories.cannotBundleLibrary())
  }

  if (options.jsx != null && options.jsx !== JsxEmit.None && options.jsx !== JsxEmit.React) {
    diagnostics.push(diagnosticFactories.unsupportedJsxEmit())
  }

  if (options.paths != null && options.baseUrl == null) {
    diagnostics.push(diagnosticFactories.pathsWithoutBaseUrl())
  }

  return diagnostics
}
