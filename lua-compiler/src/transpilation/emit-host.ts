import type { SourceNode } from "source-map"
import type * as ts from "typescript"
import * as luaStatements from "../LuaAST-statements"

export interface EmitHost {
  directoryExists: (path: string) => boolean
  fileExists: (path: string) => boolean
  getCurrentDirectory: () => string
  readFile: (path: string) => string | undefined
  writeFile: ts.WriteFileCallback
}

interface BaseFile {
  code: string
  sourceMap?: string
  sourceFiles?: readonly ts.SourceFile[]
}

export interface ProcessedFile extends BaseFile {
  fileName: string
  luaAst?: luaStatements.File
  sourceMapNode?: SourceNode
}

export interface EmitFile extends BaseFile {
  outputPath: string
}
