import * as path from "path"
import * as ts from "typescript"
import { getBundleResult } from "../transpile-bundle/transpile-bundle.module.code.ts"
import type {
  EmitFile,
  ProcessedFile,
} from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import { getPlugins, type Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"
import {
  getEmitPath,
  getSourceDir,
} from "../transpile-program-paths/transpile-program-paths.module.code.ts"
import { resolveDependencies } from "../transpile-resolve/transpile-resolve.module.code.ts"
import {
  getProgramTranspileResult,
  type TranspileOptions,
} from "../transpile-transpile/transpile-transpile.module.code.ts"
import {
  type CompilerOptions,
  isBundleEnabled,
  LuaLibImportKind,
  LuaTarget,
} from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { lualibTranspilerHolder } from "../tstl-lualib-builder-deps/tstl-lualib-builder-deps.module.code.ts"
import {
  buildMinimalLualibBundle,
  findUsedLualibFeatures,
  getLuaLibBundle,
} from "../tstl-lualib-runtime/tstl-lualib-runtime.module.code.ts"
import * as performance from "../tstl-measure-performance/tstl-measure-performance.module.code.ts"
import { normalizeSlashes } from "../tstl-utils/tstl-utils.module.code.ts"

export interface TranspilerOptions {
  emitHost?: EmitHost
}

export interface EmitOptions extends TranspileOptions {
  writeFile?: ts.WriteFileCallback
}

export interface EmitResult {
  emitSkipped: boolean
  diagnostics: readonly ts.Diagnostic[]
}

export interface Transpiler {
  emit: (emitOptions: EmitOptions) => EmitResult
}

export function createTranspiler({ emitHost = ts.sys }: TranspilerOptions = {}): Transpiler {
  function emit(emitOptions: EmitOptions): EmitResult {
    const { program, writeFile = emitHost.writeFile, plugins: optionsPlugins = [] } = emitOptions

    const { diagnostics: getPluginsDiagnostics, plugins: configPlugins } = getPlugins(program)
    const plugins = [...optionsPlugins, ...configPlugins]

    const { diagnostics: transpileDiagnostics, transpiledFiles: freshFiles } =
      getProgramTranspileResult(emitHost, writeFile, {
        ...emitOptions,
        plugins,
      })

    const { emitPlan, additionalDiagnostics } = computeEmitPlan(program, freshFiles, plugins)

    const emitDiagnostics = emitFiles(program, plugins, emitPlan, writeFile)

    return {
      diagnostics: getPluginsDiagnostics.concat(
        transpileDiagnostics,
        additionalDiagnostics,
        emitDiagnostics
      ),
      emitSkipped: emitPlan.length === 0,
    }
  }

  function emitFiles(
    program: ts.Program,
    plugins: readonly Plugin[],
    emitPlan: readonly EmitFile[],
    writeFile: ts.WriteFileCallback
  ): readonly ts.Diagnostic[] {
    performance.startSection("emit")

    const options = program.getCompilerOptions()

    if (options.tstlVerbose === true) {
      console.log("Emitting output")
    }

    const diagnostics: ts.Diagnostic[] = []

    for (const plugin of plugins) {
      if (plugin.beforeEmit) {
        const beforeEmitPluginDiagnostics =
          plugin.beforeEmit(program, options, emitHost, emitPlan) ?? []
        diagnostics.push(...beforeEmitPluginDiagnostics)
      }
    }

    const emitBOM = options.emitBOM ?? false
    for (const { outputPath, code, sourceMap, sourceFiles } of emitPlan) {
      if (options.tstlVerbose === true) {
        console.log(`Emitting ${normalizeSlashes(outputPath)}`)
      }

      writeFile(outputPath, code, emitBOM, undefined, sourceFiles)
      if (options.sourceMap === true && sourceMap !== undefined) {
        writeFile(outputPath + ".map", sourceMap, emitBOM, undefined, sourceFiles)
      }
    }

    for (const plugin of plugins) {
      if (plugin.afterEmit) {
        const afterEmitPluginDiagnostics =
          plugin.afterEmit(program, options, emitHost, emitPlan) ?? []
        diagnostics.push(...afterEmitPluginDiagnostics)
      }
    }

    if (options.tstlVerbose === true) {
      console.log("Emit finished!")
    }

    performance.endSection("emit")

    return diagnostics
  }

  function computeEmitPlan(
    program: ts.Program,
    files: readonly ProcessedFile[],
    plugins: readonly Plugin[]
  ): { emitPlan: readonly EmitFile[]; additionalDiagnostics: readonly ts.Diagnostic[] } {
    performance.startSection("getEmitPlan")
    const options = program.getCompilerOptions()

    if (options.tstlVerbose === true) {
      console.log("Constructing emit plan")
    }

    const additionalDiagnostics: ts.Diagnostic[] = []

    const resolutionResult = resolveDependencies(program, files, emitHost, plugins)
    additionalDiagnostics.push(...resolutionResult.diagnostics)

    let resolvedFiles: readonly ProcessedFile[] = resolutionResult.resolvedFiles
    const lualibRequired = resolvedFiles.some((f) => f.fileName === "lualib_bundle")
    if (lualibRequired) {
      resolvedFiles = resolvedFiles.filter((f) => f.fileName !== "lualib_bundle")

      if (options.tstlVerbose === true) {
        console.log("Including lualib bundle")
      }
      const fileName = normalizeSlashes(path.resolve(getSourceDir(program), "lualib_bundle.lua"))
      const code = getLuaLibBundleContent(options, resolvedFiles)
      resolvedFiles = [{ fileName, code }, ...resolvedFiles]
    }

    let emitPlan: readonly EmitFile[]
    if (isBundleEnabled(options)) {
      const [bundleDiagnostics, bundleFile] = getBundleResult(program, resolvedFiles)
      additionalDiagnostics.push(...bundleDiagnostics)
      emitPlan = [bundleFile]
    } else {
      emitPlan = resolvedFiles.map((file) => ({
        ...file,
        outputPath: getEmitPath(file.fileName, program),
      }))
    }

    performance.endSection("getEmitPlan")

    return { emitPlan, additionalDiagnostics }
  }

  function getLuaLibBundleContent(
    options: CompilerOptions,
    resolvedFiles: readonly ProcessedFile[]
  ) {
    const luaTarget = options.luaTarget ?? LuaTarget.Universal
    if (options.luaLibImport === LuaLibImportKind.RequireMinimal) {
      const usedFeatures = findUsedLualibFeatures(
        luaTarget,
        emitHost,
        resolvedFiles.map((f) => f.code)
      )
      return buildMinimalLualibBundle(usedFeatures, luaTarget, emitHost)
    } else {
      return getLuaLibBundle(luaTarget, emitHost)
    }
  }

  return { emit }
}

lualibTranspilerHolder.fn = createTranspiler
