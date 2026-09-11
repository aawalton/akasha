import type * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type { SourceNode } from "source-map"
import type * as ts from "typescript"

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
