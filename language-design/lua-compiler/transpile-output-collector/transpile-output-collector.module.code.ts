import { intersection, union } from "akasha/language-design/lua-compiler/utils/utils.module.code.ts"
import type * as ts from "typescript"

export interface TranspiledFile {
  outPath: string
  sourceFiles: readonly ts.SourceFile[]
  lua?: string
  luaSourceMap?: string
  declaration?: string
  declarationMap?: string
  js?: string
  jsSourceMap?: string
}

export function createEmitOutputCollector(luaExtension = ".lua") {
  const files: TranspiledFile[] = []
  const writeFile: ts.WriteFileCallback = (fileName, data, _bom, _onError, sourceFiles = []) => {
    let file = files.find((f) => intersection(f.sourceFiles, sourceFiles).length > 0)
    if (!file) {
      file = { outPath: fileName, sourceFiles: [...sourceFiles] }
      files.push(file)
    } else {
      file.sourceFiles = union(file.sourceFiles, sourceFiles)
    }

    if (fileName.endsWith(luaExtension)) {
      file.lua = data
    } else if (fileName.endsWith(`${luaExtension}.map`)) {
      file.luaSourceMap = data
    } else if (fileName.endsWith(".js")) {
      file.js = data
    } else if (fileName.endsWith(".js.map")) {
      file.jsSourceMap = data
    } else if (fileName.endsWith(".d.ts")) {
      file.declaration = data
    } else if (fileName.endsWith(".d.ts.map")) {
      file.declarationMap = data
    }
  }

  return { writeFile, files }
}
