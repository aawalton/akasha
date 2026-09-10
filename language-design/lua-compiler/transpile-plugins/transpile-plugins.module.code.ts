import * as path from "node:path"
import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"
import * as resolve from "resolve"
import type * as ts from "typescript"
import * as cliDiagnostics from "../cli-diagnostics/cli-diagnostics.module.code.ts"
import type { CompilerOptions } from "../compiler-options/compiler-options.module.code.ts"
import type { Visitors } from "../context-visitors/context-visitors.module.code.ts"
import type { Printer } from "../lua-printer-helpers/lua-printer-helpers.module.code.ts"
import * as performance from "../measure-performance/measure-performance.module.code.ts"
import * as diagnosticFactories from "../transpile-diagnostics/transpile-diagnostics.module.code.ts"
import type {
  EmitFile,
  ProcessedFile,
} from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"

export interface Plugin {
  visitors?: Visitors

  printer?: Printer

  beforeTransform?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost
  ) => readonly ts.Diagnostic[] | undefined

  afterPrint?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost,
    result: readonly ProcessedFile[]
  ) => readonly ts.Diagnostic[] | undefined

  beforeEmit?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost,
    result: readonly EmitFile[]
  ) => readonly ts.Diagnostic[] | undefined

  afterEmit?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost,
    result: readonly EmitFile[]
  ) => readonly ts.Diagnostic[] | undefined

  moduleResolution?: (
    moduleIdentifier: string,
    requiringFile: string,
    options: CompilerOptions,
    emitHost: EmitHost
  ) => string | undefined
}

const getConfigDirectory = (options: ts.CompilerOptions) =>
  typeof options.configFilePath === "string" && options.configFilePath.length > 0
    ? path.dirname(options.configFilePath)
    : process.cwd()

function resolvePlugin(
  kind: string,
  optionName: string,
  basedir: string,
  query: unknown,
  importName = "default"
): { error?: ts.Diagnostic; result?: unknown } {
  if (typeof query !== "string") {
    return { error: cliDiagnostics.compilerOptionRequiresAValueOfType(optionName, "string") }
  }

  const isModuleNotFoundError = (error: unknown) =>
    isRecord(error) && error.code === "MODULE_NOT_FOUND"

  let resolved: string
  try {
    resolved = resolve.sync(query, { basedir, extensions: [".js", ".ts", ".tsx"] })
  } catch (err) {
    if (!isModuleNotFoundError(err)) throw err
    return { error: diagnosticFactories.couldNotResolveFrom(kind, query, basedir) }
  }

  const commonjsModule = require(resolved)
  const factoryModule = commonjsModule.__esModule ? commonjsModule : { default: commonjsModule }
  const result = factoryModule[importName]
  if (result === undefined) {
    return { error: diagnosticFactories.shouldHaveAExport(kind, query, importName) }
  }

  return { result }
}

export function getPlugins(program: ts.Program): {
  diagnostics: readonly ts.Diagnostic[]
  plugins: readonly Plugin[]
} {
  performance.startSection("getPlugins")
  const diagnostics: ts.Diagnostic[] = []
  const pluginsFromOptions: Plugin[] = []
  const options = program.getCompilerOptions()

  for (const [index, pluginOption] of (options.luaPlugins ?? []).entries()) {
    const optionName = `luaCompiler.luaPlugins[${index}]`

    const factory = (() => {
      if ("plugin" in pluginOption) {
        return pluginOption.plugin
      } else {
        const { error: resolveError, result: resolvedFactory } = resolvePlugin(
          "plugin",
          `${optionName}.name`,
          getConfigDirectory(options),
          pluginOption.name,
          pluginOption.import
        )

        if (resolveError) diagnostics.push(resolveError)
        return resolvedFactory
      }
    })()

    if (factory === undefined) continue

    const plugin = typeof factory === "function" ? factory(pluginOption) : factory
    pluginsFromOptions.push(plugin)
  }

  if (options.verbose === true) {
    console.log(`Loaded ${pluginsFromOptions.length} plugins`)
  }

  performance.endSection("getPlugins")

  return { diagnostics, plugins: pluginsFromOptions }
}
