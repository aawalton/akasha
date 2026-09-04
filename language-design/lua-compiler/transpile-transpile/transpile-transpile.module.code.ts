import * as path from "path"
import * as ts from "typescript"
import {
  createVisitorMap,
  transformSourceFile,
} from "../transformation/transformation.module.code.ts"
import type { ProcessedFile } from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import type { Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"
import { getProjectRoot } from "../transpile-program-paths/transpile-program-paths.module.code.ts"
import { createPruneUnusedReexportsTransformer } from "../transpile-prune-unused-reexports/transpile-prune-unused-reexports.module.code.ts"
import {
  computeReachability,
  type ReachabilityResult,
} from "../transpile-reachability/transpile-reachability.module.code.ts"
import { getTransformers } from "../transpile-transformers/transpile-transformers.module.code.ts"
import {
  type CompilerOptions,
  validateOptions,
} from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { createPrinter } from "../tstl-lua-printer/tstl-lua-printer.module.code.ts"
import * as performance from "../tstl-measure-performance/tstl-measure-performance.module.code.ts"
import { isNonNull } from "../tstl-utils/tstl-utils.module.code.ts"

export interface TranspileOptions {
  program: ts.Program
  sourceFiles?: readonly ts.SourceFile[]
  customTransformers?: ts.CustomTransformers
  plugins?: readonly Plugin[]
}

export interface TranspileResult {
  diagnostics: readonly ts.Diagnostic[]
  transpiledFiles: readonly ProcessedFile[]
}

export function getProgramTranspileResult(
  emitHost: EmitHost,
  writeFileResult: ts.WriteFileCallback,
  {
    program,
    sourceFiles: targetSourceFiles,
    customTransformers = {},
    plugins = [],
  }: TranspileOptions
): TranspileResult {
  performance.startSection("beforeTransform")

  const options = program.getCompilerOptions()

  if (options.tstlVerbose === true) {
    console.log("Parsing project settings")
  }

  const diagnostics: ts.Diagnostic[] = [...validateOptions(options)]
  let transpiledFiles: ProcessedFile[] = []

  if (options.noEmitOnError) {
    const preEmitDiagnostics = [
      ...diagnostics,
      ...program.getOptionsDiagnostics(),
      ...program.getGlobalDiagnostics(),
    ]

    if (targetSourceFiles) {
      for (const sourceFile of targetSourceFiles) {
        preEmitDiagnostics.push(...program.getSyntacticDiagnostics(sourceFile))
        preEmitDiagnostics.push(...program.getSemanticDiagnostics(sourceFile))
      }
    } else {
      preEmitDiagnostics.push(...program.getSyntacticDiagnostics())
      preEmitDiagnostics.push(...program.getSemanticDiagnostics())
    }

    if (preEmitDiagnostics.length === 0 && (options.declaration || options.composite)) {
      preEmitDiagnostics.push(...program.getDeclarationDiagnostics())
    }

    if (preEmitDiagnostics.length > 0) {
      performance.endSection("beforeTransform")
      return { diagnostics: preEmitDiagnostics, transpiledFiles }
    }
  }

  for (const plugin of plugins) {
    if (plugin.beforeTransform) {
      const pluginDiagnostics = plugin.beforeTransform(program, options, emitHost) ?? []
      diagnostics.push(...pluginDiagnostics)
    }
  }

  const visitorMap = createVisitorMap(plugins.map((p) => p.visitors).filter(isNonNull))
  const printer = createPrinter(plugins.map((p) => p.printer).filter(isNonNull))

  let reachability: ReachabilityResult | undefined
  let reachableFileNames: Set<string> | undefined
  if (
    !targetSourceFiles &&
    typeof options.luaBundle === "string" &&
    options.luaBundle.length > 0 &&
    typeof options.luaBundleEntry === "string" &&
    options.luaBundleEntry.length > 0
  ) {
    const resolvedEntry = path.resolve(getProjectRoot(program), options.luaBundleEntry)
    const entrySourceFile =
      program.getSourceFile(options.luaBundleEntry) ?? program.getSourceFile(resolvedEntry)
    if (entrySourceFile) {
      reachability = computeReachability(program, entrySourceFile)
      reachableFileNames = new Set(
        [...reachability.reachableFiles].map((sf) => path.normalize(sf.fileName))
      )
    }
  }

  const isReachable = (sf: ts.SourceFile) =>
    !reachableFileNames || reachableFileNames.has(path.normalize(sf.fileName))

  const processSourceFile = (sourceFile: ts.SourceFile) => {
    if (!isReachable(sourceFile)) return

    if (options.tstlVerbose === true) {
      console.log(`Transforming ${sourceFile.fileName}`)
    }

    performance.startSection("transpile")

    const { file, diagnostics: transformDiagnostics } = transformSourceFile(
      program,
      sourceFile,
      visitorMap
    )
    diagnostics.push(...transformDiagnostics)

    performance.endSection("transpile")

    if (!options.noEmit && !options.emitDeclarationOnly) {
      performance.startSection("print")
      if (options.tstlVerbose === true) {
        console.log(`Printing ${sourceFile.fileName}`)
      }

      const printResult = printer(program, emitHost, sourceFile.fileName, file)
      transpiledFiles.push({
        sourceFiles: [sourceFile],
        fileName: path.normalize(sourceFile.fileName),
        luaAst: file,
        ...printResult,
      })
      performance.endSection("print")
    }
  }

  const transformers = getTransformers(program, customTransformers, processSourceFile, reachability)

  const isEmittableJsonFile = (sourceFile: ts.SourceFile): boolean =>
    (sourceFile.flags & ts.NodeFlags.JsonFile) !== 0 &&
    !options.emitDeclarationOnly &&
    !program.isSourceFileFromExternalLibrary(sourceFile)

  const oldNoEmit = options.noEmit
  options.noEmit = false

  const writeFile: ts.WriteFileCallback = (fileName, ...rest) => {
    if (!fileName.endsWith(".js") && !fileName.endsWith(".js.map") && !fileName.endsWith(".json")) {
      writeFileResult(fileName, ...rest)
    }
  }

  performance.endSection("beforeTransform")

  if (targetSourceFiles) {
    for (const file of targetSourceFiles) {
      if (isEmittableJsonFile(file)) {
        processSourceFile(file)
      } else {
        diagnostics.push(
          ...program.emit(file, writeFile, undefined, false, transformers).diagnostics
        )
      }
    }
  } else {
    diagnostics.push(
      ...program.emit(undefined, writeFile, undefined, false, transformers).diagnostics
    )

    program.getSourceFiles().filter(isEmittableJsonFile).forEach(processSourceFile)

    {
      const alreadyTranspiled = new Set(transpiledFiles.map((f) => f.fileName))
      const pruneTransformer = reachability
        ? createPruneUnusedReexportsTransformer(program, reachability)
        : undefined
      for (const sourceFile of program.getSourceFiles()) {
        if (sourceFile.isDeclarationFile) continue
        const normalized = path.normalize(sourceFile.fileName)
        if (alreadyTranspiled.has(normalized)) continue
        if (isEmittableJsonFile(sourceFile)) continue
        if (!isReachable(sourceFile)) continue
        let working = sourceFile
        if (pruneTransformer) {
          const transformed = ts.transform(sourceFile, [pruneTransformer])
          const out = transformed.transformed[0]
          if (out && ts.isSourceFile(out)) working = out
          transformed.dispose()
        }
        processSourceFile(working)
      }
    }
  }

  performance.startSection("afterPrint")

  options.noEmit = oldNoEmit

  if (options.noEmit || (options.noEmitOnError && diagnostics.length > 0)) {
    transpiledFiles = []
  }

  for (const plugin of plugins) {
    if (plugin.afterPrint) {
      const pluginDiagnostics = plugin.afterPrint(program, options, emitHost, transpiledFiles) ?? []
      diagnostics.push(...pluginDiagnostics)
    }
  }

  performance.endSection("afterPrint")

  return { diagnostics, transpiledFiles }
}
