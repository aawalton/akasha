import * as fs from "node:fs"
import * as path from "node:path"
import type { CompilerOptions } from "akasha/design/language/lua-compiler/compiler-options/compiler-options.module.code.ts"
import { parseConfigFileWithSystem } from "akasha/design/language/lua-compiler/modules/cli-tsconfig/cli-tsconfig.module.code.ts"
import {
  createEmitOutputCollector,
  type TranspiledFile,
} from "akasha/design/language/lua-compiler/transpile-output-collector/transpile-output-collector.module.code.ts"
import {
  createTranspiler,
  type EmitResult,
} from "akasha/design/language/lua-compiler/transpile-transpiler/transpile-transpiler.module.code.ts"
import { normalizeSlashes } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import * as ts from "typescript"
import { z } from "zod"

function transpileFiles(
  rootNames: readonly string[],
  options: CompilerOptions = {},
  writeFile?: ts.WriteFileCallback
): EmitResult {
  const program = ts.createProgram(rootNames, options)
  const preEmitDiagnostics = ts.getPreEmitDiagnostics(program)
  const { diagnostics: transpileDiagnostics, emitSkipped } = createTranspiler().emit({
    program,
    writeFile,
  })
  const diagnostics = ts.sortAndDeduplicateDiagnostics([
    ...preEmitDiagnostics,
    ...transpileDiagnostics,
  ])

  return { diagnostics: [...diagnostics], emitSkipped }
}

export function transpileProject(
  configFileName: string,
  optionsToExtend?: CompilerOptions,
  writeFile?: ts.WriteFileCallback
): EmitResult {
  const parseResult = parseConfigFileWithSystem(configFileName, optionsToExtend)
  if (parseResult.errors.length > 0) {
    return { diagnostics: parseResult.errors, emitSkipped: true }
  }

  return transpileFiles(parseResult.fileNames, parseResult.options, writeFile)
}

const libCache: { [key: string]: ts.SourceFile } = {}

function createVirtualProgram(
  input: Record<string, string>,
  options: CompilerOptions = {}
): ts.Program {
  const normalizedFiles: Record<string, string> = {}
  for (const [fileName, file] of Object.entries(input)) {
    normalizedFiles[normalizeSlashes(fileName)] = file
  }
  const compilerHost: ts.CompilerHost = {
    fileExists: (fileName) => fileName in normalizedFiles || ts.sys.fileExists(fileName),
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => "",
    getDefaultLibFileName: ts.getDefaultLibFileName,
    readFile: () => "",
    getNewLine: () => "\n",
    useCaseSensitiveFileNames: () => false,
    writeFile() {},

    getSourceFile(fileName) {
      const normalizedFile = normalizedFiles[fileName]
      if (normalizedFile !== undefined) {
        return ts.createSourceFile(fileName, normalizedFile, ts.ScriptTarget.Latest, false)
      }

      let filePath: string | undefined

      if (fileName.startsWith("lib.")) {
        const typeScriptDir = path.dirname(require.resolve("typescript"))
        filePath = path.join(typeScriptDir, fileName)
      }

      if (fileName.includes("language-extensions")) {
        const dtsName = fileName.replace(/(\.d)?(\.ts)$/, ".d.ts")
        filePath = path.resolve(dtsName)
      }

      if (filePath !== undefined) {
        if (libCache[fileName]) return libCache[fileName]
        const content = z.string().parse(fs.readFileSync(filePath, "utf8"))
        libCache[fileName] = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, false)
        return libCache[fileName]
      }
    },
  }

  return ts.createProgram(Object.keys(normalizedFiles), options, compilerHost)
}

export interface TranspileVirtualProjectResult {
  diagnostics: readonly ts.Diagnostic[]
  transpiledFiles: readonly TranspiledFile[]
}

function transpileVirtualProject(
  files: Record<string, string>,
  options: CompilerOptions = {}
): TranspileVirtualProjectResult {
  const program = createVirtualProgram(files, options)
  const preEmitDiagnostics = ts.getPreEmitDiagnostics(program)
  const collector = createEmitOutputCollector()
  const { diagnostics: transpileDiagnostics } = createTranspiler().emit({
    program,
    writeFile: collector.writeFile,
  })
  const diagnostics = ts.sortAndDeduplicateDiagnostics([
    ...preEmitDiagnostics,
    ...transpileDiagnostics,
  ])

  return { diagnostics: [...diagnostics], transpiledFiles: collector.files }
}

export interface TranspileStringResult {
  diagnostics: readonly ts.Diagnostic[]
  file?: TranspiledFile
}

export function transpileString(
  main: string,
  options: CompilerOptions = {}
): TranspileStringResult {
  const { diagnostics, transpiledFiles } = transpileVirtualProject({ "main.ts": main }, options)
  return {
    diagnostics,
    file: transpiledFiles.find(({ sourceFiles }) =>
      sourceFiles.some((f) => f.fileName === "main.ts")
    ),
  }
}
