import * as path from "path"
import { SourceNode } from "source-map"
import type * as ts from "typescript"
import { couldNotFindBundleEntryPoint } from "../transpile-diagnostics/transpile-diagnostics.module.code.ts"
import type {
  EmitFile,
  ProcessedFile,
} from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import {
  getEmitOutDir,
  getEmitPathRelativeToOutDir,
  getProjectRoot,
} from "../transpile-program-paths/transpile-program-paths.module.code.ts"
import {
  type CompilerOptions,
  LuaTarget,
} from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { escapeString } from "../tstl-lua-printer-helpers/tstl-lua-printer-helpers.module.code.ts"
import {
  cast,
  formatPathToLuaPath,
  isNonNull,
  trimExtension,
} from "../tstl-utils/tstl-utils.module.code.ts"

const createModulePath = (pathToResolve: string, program: ts.Program) =>
  escapeString(
    formatPathToLuaPath(trimExtension(getEmitPathRelativeToOutDir(pathToResolve, program)))
  )

function requireOverride(options: CompilerOptions) {
  const runModule =
    options.luaTarget === LuaTarget.Lua50
      ? "if (table.getn(arg) > 0) then value = module(unpack(arg)) else value = module(file) end"
      : 'if (select("#", ...) > 0) then value = module(...) else value = module(file) end'
  return `
local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    local entry = ____moduleCache[file]
    if entry then
        if entry.loading and not entry.proxy then
            entry.proxy = {}
            entry.value = entry.proxy
        end
        return entry.value
    end
    if ____modules[file] then
        local module = ____modules[file]
        entry = { loading = true }
        ____moduleCache[file] = entry
        local value = nil
        ${runModule}
        entry.loading = false
        if entry.proxy then
            setmetatable(entry.proxy, { __index = value, __newindex = value })
        else
            entry.value = value
        end
        return entry.value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
`
}

export function getBundleResult(
  program: ts.Program,
  files: readonly ProcessedFile[]
): readonly [readonly ts.Diagnostic[], EmitFile] {
  const diagnostics: ts.Diagnostic[] = []

  const options = program.getCompilerOptions()
  const bundleFile = cast(options.luaBundle, isNonNull)
  const entryModule = cast(options.luaBundleEntry, isNonNull)

  const resolvedEntryModule = path.resolve(getProjectRoot(program), entryModule)
  const outputPath = path.resolve(getEmitOutDir(program), bundleFile)
  const entryModuleFilePath =
    program.getSourceFile(entryModule)?.fileName ??
    program.getSourceFile(resolvedEntryModule)?.fileName

  if (entryModuleFilePath === undefined) {
    diagnostics.push(couldNotFindBundleEntryPoint(entryModule))
  }

  const moduleTableEntries = files.map((f) =>
    moduleSourceNode(f, createModulePath(f.fileName, program))
  )

  const moduleTable = createModuleTableNode(moduleTableEntries)

  const args = options.luaTarget === LuaTarget.Lua50 ? "unpack(arg == nil and {} or arg)" : "..."
  const entryPath = createModulePath(entryModuleFilePath ?? entryModule, program)
  const entryPoint = `local ____entry = require(${entryPath}, ${args})\nreturn ____entry\n`

  const sourceChunks = [requireOverride(options), moduleTable, entryPoint]

  const bundleNode = joinSourceChunks(sourceChunks)
  const { code, map } = bundleNode.toStringWithSourceMap()

  return [
    diagnostics,
    {
      outputPath,
      code,
      sourceMap: map.toString(),
      sourceFiles: files.flatMap((x) => x.sourceFiles ?? []),
    },
  ]
}

function moduleSourceNode({ code, sourceMapNode }: ProcessedFile, modulePath: string): SourceNode {
  const tableEntryHead = `[${modulePath}] = function(...) \n`
  const tableEntryTail = " end,\n"

  return joinSourceChunks([tableEntryHead, sourceMapNode ?? code, tableEntryTail])
}

function createModuleTableNode(fileChunks: readonly SourceChunk[]): SourceNode {
  const tableHead = "____modules = {\n"
  const tableEnd = "}\n"

  return joinSourceChunks([tableHead, ...fileChunks, tableEnd])
}

type SourceChunk = string | SourceNode

function joinSourceChunks(chunks: readonly SourceChunk[]): SourceNode {
  return new SourceNode(null, null, null, [...chunks])
}
