import "../tstl-lua-printer/tstl-lua-printer.module.code.ts"
import "../transpile-transpiler/transpile-transpiler.module.code.ts"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import * as path from "path"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import type { Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"
import { parseConfigFileWithSystem } from "../tstl-cli-tsconfig/tstl-cli-tsconfig.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import type * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  getLualibBundleReturn,
  LuaLibFeature,
  type LuaLibModulesInfo,
  resolveRecursiveLualibFeatures,
} from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import {
  requireLualibPrinter,
  requireLualibTranspiler,
} from "../tstl-lualib-builder-deps/tstl-lualib-builder-deps.module.code.ts"
import { cast } from "../tstl-utils/tstl-utils.module.code.ts"

function isExportTable(node: luaCore.Node): node is luaExpressions.Identifier {
  return luaExpressions.isIdentifier(node) && node.text === "____exports"
}

function isExportTableDeclaration(node: luaCore.Node): boolean {
  if (!luaStatements.isVariableDeclarationStatement(node)) return false
  const [first] = node.left
  return first !== undefined && isExportTable(first)
}

type ExportTableIndex = luaExpressions.TableIndexExpression & {
  index: luaExpressions.StringLiteral
}

function isExportTableIndex(node: luaCore.Node): node is ExportTableIndex {
  return (
    luaExpressions.isTableIndexExpression(node) &&
    isExportTable(node.table) &&
    luaExpressions.isStringLiteral(node.index)
  )
}

type ExportAliasStatement = luaStatements.VariableDeclarationStatement & {
  left: readonly [luaExpressions.Identifier]
  right: readonly [ExportTableIndex]
}

function isExportAlias(node: luaCore.Node): node is ExportAliasStatement {
  if (!luaStatements.isVariableDeclarationStatement(node)) return false
  if (node.left.length !== 1) return false
  if (node.right === undefined || node.right.length !== 1) return false
  const [first] = node.right
  return first !== undefined && isExportTableIndex(first)
}

type ExportAssignmentStatement = luaStatements.AssignmentStatement & {
  left: readonly [ExportTableIndex]
}

function isExportAssignment(node: luaCore.Node): node is ExportAssignmentStatement {
  if (!luaStatements.isAssignmentStatement(node)) return false
  if (node.left.length !== 1) return false
  const [first] = node.left
  return first !== undefined && isExportTableIndex(first)
}

function isRequire(node: luaCore.Node): boolean {
  if (!luaStatements.isVariableDeclarationStatement(node)) return false
  if (node.right === undefined) return false
  const [first] = node.right
  if (first === undefined || !luaExpressions.isCallExpression(first)) return false
  return luaExpressions.isIdentifier(first.expression) && first.expression.text === "require"
}

function isImport(node: luaCore.Node, importNames: Set<string>): boolean {
  if (!luaStatements.isVariableDeclarationStatement(node)) return false
  const [first] = node.left
  return first !== undefined && importNames.has(first.text)
}

function isExportsReturn(node: luaCore.Node): boolean {
  if (!luaStatements.isReturnStatement(node)) return false
  const [first] = node.expressions
  if (first === undefined) return false
  return luaExpressions.isIdentifier(first) && first.text === "____exports"
}

function createLuaLibPrinter(emitHost: EmitHost, program: ts.Program, fileName: string) {
  return requireLualibPrinter()(emitHost, program, fileName, {
    printTableIndexExpression: (defaultPrint, expression, printers) => {
      if (
        luaExpressions.isIdentifier(expression.table) &&
        expression.table.text === "____exports" &&
        luaExpressions.isStringLiteral(expression.index)
      ) {
        return printers.printExpression(luaExpressions.createIdentifier(expression.index.value))
      }
      return defaultPrint(expression)
    },
  })
}

const luaLibFeatureValues: ReadonlySet<string> = new Set<string>(Object.values(LuaLibFeature))

function isLuaLibFeature(value: string): value is LuaLibFeature {
  return luaLibFeatureValues.has(value)
}

interface LuaLibPlugin extends Plugin {
  readonly featureExports: Map<LuaLibFeature, Set<string>>
  readonly featureDependencies: Map<LuaLibFeature, Set<LuaLibFeature>>
  readonly featureCode: Map<LuaLibFeature, string>
  buildModulesInfo: () => LuaLibModulesInfo
}

function createLuaLibPlugin(): LuaLibPlugin {
  const featureExports = new Map<LuaLibFeature, Set<string>>()
  const featureDependencies = new Map<LuaLibFeature, Set<LuaLibFeature>>()
  const featureCode = new Map<LuaLibFeature, string>()

  function visitSourceFile(
    file: ts.SourceFile,
    context: TransformationContext
  ): luaStatements.File {
    const featureName = path.basename(file.fileName, ".ts")
    if (!isLuaLibFeature(featureName)) {
      context.addDiagnostic({
        category: ts.DiagnosticCategory.Error,
        code: 200000,
        file,
        start: 0,
        length: 0,
        messageText: `File is not a lualib feature: ${featureName}`,
      })
      return cast(requireFirst(context.superTransformNode(file)), luaStatements.isFile)
    }

    const fileResult = cast(requireFirst(context.superTransformNode(file)), luaStatements.isFile)

    const usedFeatures = new Set<LuaLibFeature>(context.usedLuaLibFeatures)

    const importNames = new Set<string>()
    const imports = file.statements.filter(ts.isImportDeclaration)
    for (const { importClause, moduleSpecifier } of imports) {
      if (importClause?.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
        for (const { name } of importClause.namedBindings.elements) {
          importNames.add(name.text)
        }
      }
      if (ts.isStringLiteral(moduleSpecifier)) {
        const importedFeature = path.basename(moduleSpecifier.text, ".ts")
        if (isLuaLibFeature(importedFeature)) {
          usedFeatures.add(importedFeature)
        }
      }
    }

    const filteredStatements = fileResult.statements
      .filter(
        (s) =>
          !isExportTableDeclaration(s) &&
          !isRequire(s) &&
          !isImport(s, importNames) &&
          !isExportsReturn(s)
      )
      .map((statement) => {
        if (isExportAlias(statement)) {
          const name = statement.left[0]
          const exportName = statement.right[0].index.value
          if (name.text === exportName) return undefined
          return luaStatements.createAssignmentStatement(
            name,
            luaExpressions.createIdentifier(exportName)
          )
        }
        return statement
      })
      .filter((statement): statement is luaStatements.Statement => statement !== undefined)

    const exportNames = filteredStatements
      .filter(isExportAssignment)
      .map((s) => s.left[0].index.value)

    if (!filteredStatements.every(isExportAssignment)) {
      const outerLocals = luaStatements.createVariableDeclarationStatement(
        exportNames.map((k) => luaExpressions.createIdentifier(k))
      )
      const body = filteredStatements.map((s) =>
        isExportAssignment(s)
          ? luaStatements.createAssignmentStatement(
              luaExpressions.createIdentifier(s.left[0].index.value),
              s.right[0]
            )
          : s
      )
      fileResult.statements = [outerLocals, luaStatements.createDoStatement(body)]
    } else {
      fileResult.statements = filteredStatements.map((s) =>
        luaStatements.createVariableDeclarationStatement(
          luaExpressions.createIdentifier(s.left[0].index.value),
          s.right[0]
        )
      )
    }

    featureExports.set(featureName, new Set(exportNames))
    if (usedFeatures.size > 0) {
      featureDependencies.set(featureName, usedFeatures)
    }

    return fileResult
  }

  function buildModulesInfo(): LuaLibModulesInfo {
    return Object.values(LuaLibFeature).reduce<LuaLibModulesInfo>((acc, feature) => {
      const exports = featureExports.get(feature)
      if (!exports) {
        throw new Error(`lualib builder: missing emit for feature ${feature}`)
      }
      const deps = featureDependencies.get(feature)
      acc[feature] = {
        exports: Array.from(exports),
        dependencies: deps ? Array.from(deps) : undefined,
      }
      return acc
    }, Object.create(null))
  }

  return {
    featureExports,
    featureDependencies,
    featureCode,
    visitors: {
      [ts.SyntaxKind.SourceFile]: visitSourceFile,
    },
    printer: (program, emitHost, fileName, file) =>
      createLuaLibPrinter(emitHost, program, fileName).print(file),
    afterPrint: (_program, _options, _emitHost, result) => {
      for (const file of result) {
        const base = path.basename(file.fileName)
        const featureName = base.replace(/\.(ts|lua)$/, "")
        if (isLuaLibFeature(featureName)) {
          featureCode.set(featureName, file.code)
        }
      }
      return []
    },
    buildModulesInfo,
  }
}

export interface BuiltLuaLib {
  featureCode: Map<LuaLibFeature, string>
  modulesInfo: LuaLibModulesInfo
  fullBundle: string
}

const cache = new Map<LuaTarget, BuiltLuaLib>()

function resolveLualibTsconfig(luaTarget: LuaTarget): string {
  const lualibRoot = path.resolve(import.meta.dir, "..", "lualib")
  const configName = luaTarget === LuaTarget.Lua50 ? "tsconfig.lua50.json" : "tsconfig.json"
  return path.join(lualibRoot, configName)
}

export function buildLuaLib(luaTarget: LuaTarget): BuiltLuaLib {
  const cached = cache.get(luaTarget)
  if (cached) return cached

  const configFileName = resolveLualibTsconfig(luaTarget)
  const parsedConfig = parseConfigFileWithSystem(configFileName)
  if (parsedConfig.errors.length > 0) {
    const messages = parsedConfig.errors
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"))
      .join("\n")
    throw new Error(`lualib builder: failed to parse ${configFileName}:\n${messages}`)
  }

  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: parsedConfig.options,
  })

  const plugin = createLuaLibPlugin()
  const transpiler = requireLualibTranspiler()()

  const writeFile: ts.WriteFileCallback = () => {}

  const emitResult = transpiler.emit({
    program,
    plugins: [plugin],
    writeFile,
  })

  const errors = emitResult.diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error)
  if (errors.length > 0) {
    const messages = errors
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"))
      .join("\n")
    throw new Error(`lualib builder: transpile failed for ${configFileName}:\n${messages}`)
  }

  const modulesInfo = plugin.buildModulesInfo()
  const featureCode = plugin.featureCode

  const allFeatures = Object.values(LuaLibFeature)
  const ordered = resolveRecursiveLualibFeatures(allFeatures, luaTarget, modulesInfo)
  const allExports = allFeatures.flatMap((f) => modulesInfo[f].exports)
  const fullBundle = `${ordered.map((f) => featureCode.get(f) ?? "").join("\n")}${getLualibBundleReturn(allExports)}`

  const built: BuiltLuaLib = { featureCode, modulesInfo, fullBundle }
  cache.set(luaTarget, built)
  return built
}
