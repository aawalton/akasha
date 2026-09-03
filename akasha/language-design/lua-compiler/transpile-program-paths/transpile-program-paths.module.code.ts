import * as path from "path"
import type * as ts from "typescript"
import { trimExtension } from "../tstl-utils/tstl-utils.module.code.ts"

export function getEmitPath(file: string, program: ts.Program): string {
  const relativeOutputPath = getEmitPathRelativeToOutDir(file, program)
  const outDir = getEmitOutDir(program)

  return path.join(outDir, relativeOutputPath)
}

export function getEmitPathRelativeToOutDir(fileName: string, program: ts.Program): string {
  const sourceDir = getSourceDir(program)
  let emitPathSplits = path.relative(sourceDir, fileName).split(path.sep)

  emitPathSplits = emitPathSplits.filter((s) => s !== "..")

  if (emitPathSplits[0] === "node_modules") {
    emitPathSplits[0] = "lua_modules"
  }

  const extension = (program.getCompilerOptions().extension ?? "lua").trim()
  const trimmedExtension = extension.startsWith(".") ? extension.substring(1) : extension
  const lastIndex = emitPathSplits.length - 1
  const lastSegment = emitPathSplits[lastIndex]
  if (lastSegment !== undefined) {
    emitPathSplits[lastIndex] = trimExtension(lastSegment) + "." + trimmedExtension
  }

  return path.join(...emitPathSplits)
}

export function getSourceDir(program: ts.Program): string {
  const rootDir = program.getCompilerOptions().rootDir
  if (typeof rootDir === "string" && rootDir.length > 0) {
    return path.isAbsolute(rootDir) ? rootDir : path.resolve(getProjectRoot(program), rootDir)
  }

  return getProjectRoot(program)
}

export function getEmitOutDir(program: ts.Program): string {
  const outDir = program.getCompilerOptions().outDir
  if (typeof outDir === "string" && outDir.length > 0) {
    return path.isAbsolute(outDir) ? outDir : path.resolve(getProjectRoot(program), outDir)
  }

  return getProjectRoot(program)
}

export function getProjectRoot(program: ts.Program): string {
  const tsConfigPath = program.getCompilerOptions().configFilePath
  return typeof tsConfigPath === "string" && tsConfigPath.length > 0
    ? path.dirname(tsConfigPath)
    : program.getCommonSourceDirectory()
}
