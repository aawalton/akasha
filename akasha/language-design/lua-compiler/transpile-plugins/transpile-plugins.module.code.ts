import * as path from "path"
import * as resolve from "resolve"
import type * as ts from "typescript"
import type { Visitors } from "../context-visitors/context-visitors.module.code.ts"
import * as diagnosticFactories from "../transpile-diagnostics/transpile-diagnostics.module.code.ts"
import type {
  EmitFile,
  ProcessedFile,
} from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import * as cliDiagnostics from "../tstl-cli-diagnostics/tstl-cli-diagnostics.module.code.ts"
import type { CompilerOptions } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import type { Printer } from "../tstl-lua-printer-helpers/tstl-lua-printer-helpers.module.code.ts"
import * as performance from "../tstl-measure-performance/tstl-measure-performance.module.code.ts"

export interface Plugin {
  visitors?: Visitors

  printer?: Printer

  beforeTransform?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost
  ) => readonly ts.Diagnostic[] | void

  afterPrint?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost,
    result: readonly ProcessedFile[]
  ) => readonly ts.Diagnostic[] | void

  beforeEmit?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost,
    result: readonly EmitFile[]
  ) => readonly ts.Diagnostic[] | void

  afterEmit?: (
    program: ts.Program,
    options: CompilerOptions,
    emitHost: EmitHost,
    result: readonly EmitFile[]
  ) => readonly ts.Diagnostic[] | void

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

const getTstlDirectory = () => path.dirname(__dirname)

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

  const isModuleNotFoundError = (error: any) => error.code === "MODULE_NOT_FOUND"

  let resolved: string
  try {
    resolved = resolve.sync(query, { basedir, extensions: [".js", ".ts", ".tsx"] })
  } catch (err) {
    if (!isModuleNotFoundError(err)) throw err
    return { error: diagnosticFactories.couldNotResolveFrom(kind, query, basedir) }
  }

  const hasNoRequireHook = require.extensions[".ts"] === undefined
  if (hasNoRequireHook && (resolved.endsWith(".ts") || resolved.endsWith(".tsx"))) {
    try {
      const tsNodePath = resolve.sync("ts-node", { basedir: getTstlDirectory() })
      const tsNode: typeof import("ts-node") = require(tsNodePath)
      tsNode.register({ transpileOnly: true })
    } catch (err) {
      if (!isModuleNotFoundError(err)) throw err
      return { error: diagnosticFactories.toLoadItShouldBeTranspiled(kind, query) }
    }
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
    const optionName = `tstl.luaPlugins[${index}]`

    const factory = (() => {
      if ("plugin" in pluginOption) {
        return pluginOption.plugin
      } else {
        const { error: resolveError, result: factory } = resolvePlugin(
          "plugin",
          `${optionName}.name`,
          getConfigDirectory(options),
          pluginOption.name,
          pluginOption.import
        )

        if (resolveError) diagnostics.push(resolveError)
        return factory
      }
    })()

    if (factory === undefined) continue

    const plugin = typeof factory === "function" ? factory(pluginOption) : factory
    pluginsFromOptions.push(plugin)
  }

  if (options.tstlVerbose === true) {
    console.log(`Loaded ${pluginsFromOptions.length} plugins`)
  }

  performance.endSection("getPlugins")

  return { diagnostics, plugins: pluginsFromOptions }
}
