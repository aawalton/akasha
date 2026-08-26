import type * as ts from "typescript"
import type { EmitHost } from "./utils"
import type { CompilerOptions } from "../CompilerOptions"
import type { Printer } from "../LuaPrinter-helpers"
import * as performance from "../measure-performance"
import type { Visitors } from "../transformation/context/visitors"
import { type EmitFile, getConfigDirectory, type ProcessedFile, resolvePlugin } from "./utils"

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
