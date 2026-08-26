import * as path from "path"
import { type Mapping, SourceMapGenerator, type SourceNode } from "source-map"
import type * as ts from "typescript"
import { LuaLibImportKind, LuaTarget } from "./CompilerOptions"
import * as luaStatements from "./LuaAST-statements"
import * as luaExpressions from "./LuaAST-expressions"
import { lualibPrinterHolder } from "./lualib-builder-deps"
import { loadImportedLualibFeatures, loadInlineLualibFeatures } from "./lualib-runtime"
import {
  concatNodes,
  createLuaPrinterState,
  type LuaPrinterPrinters,
  type LuaPrinterState,
  printStatementArray,
} from "./LuaPrinter-core"
import * as expr from "./LuaPrinter-expressions"
import {
  escapeString,
  type Printer,
  type PrintResult,
  type SourceChunk,
} from "./LuaPrinter-helpers"
import * as stmt from "./LuaPrinter-statements"
import type { EmitHost } from "./transpilation/emit-host"

export function createPrinter(printers: readonly Printer[]): Printer {
  if (printers.length === 0) {
    return (program, emitHost, fileName, file) =>
      createLuaPrinter(emitHost, program, fileName).print(file)
  } else if (printers.length === 1) {
    const [first] = printers
    if (first === undefined) throw new Error("unreachable: printers.length === 1")
    return first
  } else {
    throw new Error("Only one plugin can specify 'printer'")
  }
}

export interface LuaPrinterOverrides {
  printTableIndexExpression?: (
    defaultPrint: (expression: luaExpressions.TableIndexExpression) => SourceNode,
    expression: luaExpressions.TableIndexExpression,
    printers: LuaPrinterPrinters
  ) => SourceNode
}

export interface LuaPrinterInstance {
  print: (file: luaStatements.File) => PrintResult
}

export function createLuaPrinter(
  emitHost: EmitHost,
  program: ts.Program,
  sourceFile: string,
  overrides: LuaPrinterOverrides = {}
): LuaPrinterInstance {
  const state = createLuaPrinterState(emitHost, program, sourceFile)

  const defaultPrintTableIndexExpression = (e: luaExpressions.TableIndexExpression) =>
    expr.printTableIndexExpression(state, e)

  const overridePrintTableIndex = overrides.printTableIndexExpression
  const printers: LuaPrinterPrinters = {
    printStatement: (s) => stmt.printStatement(state, s),
    printExpression: (e) => expr.printExpression(state, e),
    printIdentifier: (e) => expr.printIdentifier(state, e),
    printFunctionDefinition: (s) => expr.printFunctionDefinition(state, s),
    printTableIndexExpression: overridePrintTableIndex
      ? (e) => overridePrintTableIndex(defaultPrintTableIndexExpression, e, printers)
      : defaultPrintTableIndexExpression,
  }

  state.printers = printers

  function print(file: luaStatements.File): PrintResult {
    const sourceRoot = state.options.sourceRoot != null
      ?
        `${state.options.sourceRoot.replace(/[\\/]+$/, "")}/`
      : ""
    const rootSourceNode = printFile(file)
    const sourceMap = buildSourceMap(sourceRoot, rootSourceNode)

    let code = rootSourceNode.toString()

    if (state.options.inlineSourceMap) {
      code += "\n" + printInlineSourceMap(sourceMap)
    }

    return { code, sourceMap: sourceMap.toString(), sourceMapNode: rootSourceNode }
  }

  function printInlineSourceMap(sourceMap: SourceMapGenerator): string {
    const map = sourceMap.toString()
    const base64Map = Buffer.from(map).toString("base64")

    return `--# sourceMappingURL=data:application/json;base64,${base64Map}\n`
  }

  function printFile(file: luaStatements.File): SourceNode {
    let sourceChunks: SourceChunk[] = [file.trivia]

    const luaTarget = state.options.luaTarget ?? LuaTarget.Universal
    const luaLibImport = state.options.luaLibImport ?? LuaLibImportKind.Require
    if (
      (luaLibImport === LuaLibImportKind.Require ||
        luaLibImport === LuaLibImportKind.RequireMinimal) &&
      file.luaLibFeatures.size > 0
    ) {
      sourceChunks = [
        ...printStatementArray(
          state,
          loadImportedLualibFeatures(file.luaLibFeatures, luaTarget, state.emitHost)
        ),
      ]
    } else if (luaLibImport === LuaLibImportKind.Inline && file.luaLibFeatures.size > 0) {
      sourceChunks.push("-- Lua Library inline imports\n")
      sourceChunks.push(loadInlineLualibFeatures(file.luaLibFeatures, luaTarget, state.emitHost))
      sourceChunks.push("-- End of Lua Library inline imports\n")
    }

    sourceChunks.push(...printStatementArray(state, file.statements))

    return concatNodes(state, ...sourceChunks)
  }

  function buildSourceMap(sourceRoot: string, rootSourceNode: SourceNode): SourceMapGenerator {
    const map = new SourceMapGenerator({
      file: path.basename(state.luaFile),
      sourceRoot,
    })

    let generatedLine = 1
    let generatedColumn = 0
    let currentMapping: Mapping | undefined

    const isNewMapping = (sourceNode: SourceNode) => {
      if (sourceNode.line === null) {
        return false
      }
      if (currentMapping === undefined) {
        return true
      }
      if (
        currentMapping.generated.line === generatedLine &&
        currentMapping.generated.column === generatedColumn &&
        currentMapping.name === sourceNode.name
      ) {
        return false
      }
      return (
        currentMapping.original.line !== sourceNode.line ||
        currentMapping.original.column !== sourceNode.column ||
        currentMapping.name !== sourceNode.name
      )
    }

    const build = (sourceNode: SourceNode) => {
      if (isNewMapping(sourceNode)) {
        currentMapping = {
          source: sourceNode.source,
          original: { line: sourceNode.line, column: sourceNode.column },
          generated: { line: generatedLine, column: generatedColumn },
          name: sourceNode.name,
        }
        map.addMapping(currentMapping)
      }

      const children: ReadonlyArray<SourceChunk> = sourceNode.children
      for (const chunk of children) {
        if (typeof chunk === "string") {
          const lines = chunk.split("\n")
          if (lines.length > 1) {
            generatedLine += lines.length - 1
            generatedColumn = 0
            currentMapping = undefined
          }
          const lastLine = lines[lines.length - 1]
          if (lastLine !== undefined) generatedColumn += lastLine.length
        } else {
          build(chunk)
        }
      }
    }
    build(rootSourceNode)

    return map
  }

  return { print }
}

lualibPrinterHolder.fn = createLuaPrinter
