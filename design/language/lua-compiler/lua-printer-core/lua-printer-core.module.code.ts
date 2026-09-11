import * as path from "node:path"
import type { CompilerOptions } from "akasha/design/language/lua-compiler/compiler-options/compiler-options.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type { SourceChunk } from "akasha/design/language/lua-compiler/lua-printer-helpers/lua-printer-helpers.module.code.ts"
import type { EmitHost } from "akasha/design/language/lua-compiler/transpile-emit-host/transpile-emit-host.module.code.ts"
import { getEmitPath } from "akasha/design/language/lua-compiler/transpile-program-paths/transpile-program-paths.module.code.ts"
import {
  intersperse,
  normalizeSlashes,
} from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import { SourceNode } from "source-map"
import type * as ts from "typescript"

export interface LuaPrinterPrinters {
  printStatement: (statement: luaStatements.Statement) => SourceNode
  printExpression: (expression: luaExpressions.Expression) => SourceNode
  printIdentifier: (expression: luaExpressions.Identifier) => SourceNode
  printFunctionDefinition: (statement: luaExpressions.FunctionDefinition) => SourceNode
  printTableIndexExpression: (expression: luaExpressions.TableIndexExpression) => SourceNode
}

export interface LuaPrinterState {
  currentIndent: string
  readonly luaFile: string
  readonly relativeSourcePath: string
  readonly options: CompilerOptions
  readonly emitHost: EmitHost
  readonly program: ts.Program
  readonly sourceFile: string
  printers: LuaPrinterPrinters
}

export function createLuaPrinterState(
  emitHost: EmitHost,
  program: ts.Program,
  sourceFile: string
): LuaPrinterState {
  const options = program.getCompilerOptions()
  const luaFile = normalizeSlashes(getEmitPath(sourceFile, program))
  const relativeSourcePath = normalizeSlashes(path.relative(path.dirname(luaFile), sourceFile))

  const unboundPrinter = (name: string) => () => {
    throw new Error(`LuaPrinter: ${name} called before printers vtable was installed`)
  }

  return {
    currentIndent: "",
    luaFile,
    relativeSourcePath,
    options,
    emitHost,
    program,
    sourceFile,
    printers: {
      printStatement: unboundPrinter("printStatement"),
      printExpression: unboundPrinter("printExpression"),
      printIdentifier: unboundPrinter("printIdentifier"),
      printFunctionDefinition: unboundPrinter("printFunctionDefinition"),
      printTableIndexExpression: unboundPrinter("printTableIndexExpression"),
    },
  }
}

export function pushIndent(state: LuaPrinterState): undefined {
  state.currentIndent += "    "
}

export function popIndent(state: LuaPrinterState): undefined {
  state.currentIndent = state.currentIndent.slice(4)
}

export function indent(state: LuaPrinterState, input: SourceChunk = ""): SourceChunk {
  return concatNodes(state, state.currentIndent, input)
}

export function createSourceNode(
  state: LuaPrinterState,
  node: luaCore.Node,
  chunks: SourceChunk | readonly SourceChunk[],
  name?: string
): SourceNode {
  const { line, column } = luaCore.getOriginalPos(node)

  function isReadonlyChunks(
    value: SourceChunk | readonly SourceChunk[]
  ): value is readonly SourceChunk[] {
    return Array.isArray(value)
  }
  const chunksArg: SourceChunk | (string | SourceNode)[] = isReadonlyChunks(chunks)
    ? [...chunks]
    : chunks
  return line !== undefined && column !== undefined
    ? new SourceNode(line + 1, column, state.relativeSourcePath, chunksArg, name)
    : new SourceNode(null, null, state.relativeSourcePath, chunksArg, name)
}

export function concatNodes(state: LuaPrinterState, ...chunks: readonly SourceChunk[]): SourceNode {
  return new SourceNode(null, null, state.relativeSourcePath, [...chunks])
}

export function printBlock(state: LuaPrinterState, block: luaStatements.Block): SourceNode {
  return concatNodes(state, ...printStatementArray(state, block.statements))
}

function statementMayRequireSemiColon(statement: luaStatements.Statement): boolean {
  return (
    luaStatements.isVariableDeclarationStatement(statement) ||
    luaStatements.isAssignmentStatement(statement) ||
    luaStatements.isExpressionStatement(statement)
  )
}

function nodeStartsWithParenthesis(sourceNode: SourceNode): boolean {
  let result: boolean | undefined
  sourceNode.walk((chunk) => {
    if (result === undefined) {
      chunk = chunk.trimLeft()

      if (chunk.length > 0) {
        result = chunk.startsWith("(")
      }
    }
  })
  return result ?? false
}

export function printStatementArray(
  state: LuaPrinterState,
  statements: readonly luaStatements.Statement[]
): readonly SourceChunk[] {
  const statementNodes: SourceNode[] = []
  for (const [index, statement] of statements.entries()) {
    const node = state.printers.printStatement(statement)

    const previousStatement = index > 0 ? statements[index - 1] : undefined
    const previousNode = index > 0 ? statementNodes[index - 1] : undefined
    if (
      previousStatement !== undefined &&
      previousNode !== undefined &&
      statementMayRequireSemiColon(previousStatement) &&
      nodeStartsWithParenthesis(node)
    ) {
      previousNode.add(";")
    }

    statementNodes.push(node)

    if (luaStatements.isReturnStatement(statement)) break
  }

  return statementNodes.length > 0 ? [...intersperse<SourceChunk>(statementNodes, "\n"), "\n"] : []
}

export function joinChunksWithComma(chunks: readonly SourceChunk[]): readonly SourceChunk[] {
  return intersperse(chunks, ", ")
}

export function printComment(
  state: LuaPrinterState,
  comment: string | readonly string[]
): SourceChunk {
  if (Array.isArray(comment)) {
    if (comment.length === 0) {
      return indent(state, "--[[]]")
    } else {
      const [firstLine, ...restLines] = comment
      if (firstLine === undefined) {
        return indent(state, "--[[]]")
      }
      const commentLines = concatNodes(
        state,
        ...restLines.map((c) => concatNodes(state, "\n", indent(state, c)))
      )
      return concatNodes(state, indent(state, "--[["), firstLine, commentLines, "]]")
    }
  } else {
    return indent(state, `--${comment}`)
  }
}
