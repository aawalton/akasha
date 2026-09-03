import { SourceNode } from "source-map"
import type { ProcessedFile } from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import type { LuaRequire } from "../transpile-find-lua-requires/transpile-find-lua-requires.module.code.ts"
import { formatPathToLuaPath } from "../tstl-utils/tstl-utils.module.code.ts"

export function replaceRequireInCode(
  file: ProcessedFile,
  originalRequire: LuaRequire,
  newRequire: string,
  extension: string | undefined
): undefined {
  const requirePath = requirePathForFile(newRequire, extension)
  file.code = file.code =
    file.code.substring(0, originalRequire.from) +
    `require("${requirePath}")` +
    file.code.substring(originalRequire.to + 1)
}

export function replaceRequireInSourceMap(
  file: ProcessedFile,
  originalRequire: LuaRequire,
  newRequire: string,
  extension?: string | undefined
): undefined {
  const requirePath = requirePathForFile(newRequire, extension)
  if (file.sourceMapNode) {
    replaceInSourceMap(
      file.sourceMapNode,
      file.sourceMapNode,
      `"${originalRequire.requirePath}"`,
      `"${requirePath}"`
    )
  }
}

function requirePathForFile(filePath: string, extension = ".lua"): string {
  if (!extension.startsWith(".")) {
    extension = `.${extension}`
  }
  if (filePath.endsWith(extension)) {
    return formatPathToLuaPath(filePath.substring(0, filePath.length - extension.length))
  } else {
    return formatPathToLuaPath(filePath)
  }
}

function replaceInSourceMap(
  node: SourceNode,
  parent: SourceNode,
  require: string,
  resolvedRequire: string
): boolean {
  if ((!node.children || node.children.length === 0) && node.toString() === require) {
    parent.children = [new SourceNode(node.line, node.column, node.source, [resolvedRequire])]
    return true
  }

  if (node.children) {
    for (const c of node.children) {
      if (replaceInSourceMap(c, node, require, resolvedRequire)) {
        return true
      }
    }
  }

  return false
}
