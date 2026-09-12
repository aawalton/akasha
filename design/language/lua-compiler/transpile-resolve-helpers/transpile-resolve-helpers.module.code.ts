import * as path from "node:path"
import { BuildMode } from "akasha/design/language/lua-compiler/compiler-options/compiler-options.module.code.ts"
import type { LuaRequire } from "akasha/design/language/lua-compiler/transpile-find-lua-requires/transpile-find-lua-requires.module.code.ts"
import {
  formatPathToLuaPath,
  trimExtension,
} from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import * as ts from "typescript"

export function shouldRewriteRequires(resolvedDependency: string, program: ts.Program) {
  return !isBuildModeLibrary(program) || !isNodeModulesFile(resolvedDependency)
}

export function shouldIncludeDependency(resolvedDependency: string, program: ts.Program) {
  if (hasSourceFileInProject(resolvedDependency, program)) return false
  if (!isNodeModulesFile(resolvedDependency)) return true
  return !isBuildModeLibrary(program)
}

export function isBuildModeLibrary(program: ts.Program) {
  return program.getCompilerOptions().buildMode === BuildMode.Library
}

export function isNodeModulesFile(filePath: string): boolean {
  return path
    .normalize(filePath)
    .split(path.sep)
    .some((p) => p === "node_modules")
}

export function isProjectFile(file: string, program: ts.Program): boolean {
  return program.getSourceFile(file) !== undefined
}

function defaultRealpath(p: string): string | undefined {
  try {
    return ts.sys.realpath !== undefined ? ts.sys.realpath(p) : p
  } catch {
    return undefined
  }
}

interface SourceFileName {
  readonly fileName: string
}

export interface ProgramFileLookup {
  getSourceFile: (fileName: string) => SourceFileName | undefined
  getSourceFiles: () => readonly SourceFileName[]
}

export function findProgramFileByCanonicalPath(
  resolvedFileName: string,
  program: ProgramFileLookup,
  realpath: (p: string) => string | undefined = defaultRealpath
): string | undefined {
  const targetReal = realpath(resolvedFileName)
  if (targetReal === undefined) return undefined

  const direct = program.getSourceFile(targetReal)
  if (direct !== undefined) return direct.fileName

  const base = path.basename(resolvedFileName)
  for (const sourceFile of program.getSourceFiles()) {
    if (path.basename(sourceFile.fileName) !== base) continue
    if (realpath(sourceFile.fileName) === targetReal) return sourceFile.fileName
  }

  return undefined
}

function hasSourceFileInProject(filePath: string, program: ts.Program) {
  const pathWithoutExtension = trimExtension(filePath)
  return (
    isProjectFile(pathWithoutExtension + ".ts", program) ||
    isProjectFile(pathWithoutExtension + ".tsx", program) ||
    isProjectFile(pathWithoutExtension + ".json", program)
  )
}

export function fallbackResolve(
  required: LuaRequire,
  sourceRootDir: string,
  fileDir: string
): string {
  return formatPathToLuaPath(
    path
      .normalize(path.join(path.relative(sourceRootDir, fileDir), required.requirePath))
      .split(path.sep)
      .filter((s) => s !== "." && s !== "..")
      .join(path.sep)
  )
}

export function luaRequireToPath(requirePath: string): string {
  return requirePath.replace(/\./g, path.sep)
}

export function removeFileExtension(filePath: string) {
  return filePath.includes(".") ? trimExtension(filePath) : filePath
}

export function removeTrailingDirectorySeparator(filePath: string) {
  return filePath.endsWith("/") || filePath.endsWith("\\") ? filePath.slice(0, -1) : filePath
}
