import type { SourceNode } from "source-map"
import type * as ts from "typescript"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

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
