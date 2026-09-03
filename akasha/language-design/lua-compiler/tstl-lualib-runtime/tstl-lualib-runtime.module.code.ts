import { requireGet } from "@akasha/utils-narrow/require-get"
import { z } from "zod"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import type { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  getLualibBundleReturn,
  LuaLibFeature,
  type LuaLibModulesInfo,
  resolveRecursiveLualibFeatures,
} from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { buildLuaLib } from "../tstl-lualib-builder/tstl-lualib-builder.module.code.ts"

const LUALIB_LOCAL_MATCH_SCHEMA = z.tuple([z.string(), z.string(), z.string()]).rest(z.unknown())

export function getLuaLibModulesInfo(luaTarget: LuaTarget, _emitHost: EmitHost): LuaLibModulesInfo {
  return buildLuaLib(luaTarget).modulesInfo
}

const lualibExportToFeature = new Map<LuaTarget, ReadonlyMap<string, LuaLibFeature>>()

export function getLuaLibExportToFeatureMap(
  luaTarget: LuaTarget,
  emitHost: EmitHost
): ReadonlyMap<string, LuaLibFeature> {
  if (!lualibExportToFeature.has(luaTarget)) {
    const luaLibModulesInfo = getLuaLibModulesInfo(luaTarget, emitHost)
    const map = new Map<string, LuaLibFeature>()
    for (const feature of Object.values(LuaLibFeature)) {
      const info = luaLibModulesInfo[feature]
      if (info === undefined) continue
      for (const exportName of info.exports) {
        map.set(exportName, feature)
      }
    }
    lualibExportToFeature.set(luaTarget, map)
  }

  return requireGet(lualibExportToFeature, luaTarget, "lualibExportToFeature")
}

export function readLuaLibFeature(
  feature: LuaLibFeature,
  luaTarget: LuaTarget,
  _emitHost: EmitHost
): string {
  const built = buildLuaLib(luaTarget)
  const code = built.featureCode.get(feature)
  if (code === undefined) {
    throw new Error(`Could not build lualib feature '${feature}' for target ${luaTarget}`)
  }
  return code
}

export function loadInlineLualibFeatures(
  features: Iterable<LuaLibFeature>,
  luaTarget: LuaTarget,
  emitHost: EmitHost
): string {
  const modulesInfo = getLuaLibModulesInfo(luaTarget, emitHost)
  return resolveRecursiveLualibFeatures(features, luaTarget, modulesInfo)
    .map((feature) => readLuaLibFeature(feature, luaTarget, emitHost))
    .join("\n")
}

export function loadImportedLualibFeatures(
  features: Iterable<LuaLibFeature>,
  luaTarget: LuaTarget,
  emitHost: EmitHost
): readonly luaStatements.Statement[] {
  const luaLibModuleInfo = getLuaLibModulesInfo(luaTarget, emitHost)

  const imports = Array.from(features).flatMap((feature) => luaLibModuleInfo[feature].exports)
  if (imports.length === 0) {
    return []
  }

  const requireCall = luaExpressions.createCallExpression(
    luaExpressions.createIdentifier("require"),
    [luaExpressions.createStringLiteral("lualib_bundle")]
  )

  const luaLibId = luaExpressions.createIdentifier("____lualib")
  const importStatement = luaStatements.createVariableDeclarationStatement(luaLibId, requireCall)
  const statements: luaStatements.Statement[] = [importStatement]
  for (const item of imports) {
    statements.push(
      luaStatements.createVariableDeclarationStatement(
        luaExpressions.createIdentifier(item),
        luaExpressions.createTableIndexExpression(
          luaLibId,
          luaExpressions.createStringLiteral(item)
        )
      )
    )
  }
  return statements
}

export function getLuaLibBundle(luaTarget: LuaTarget, _emitHost: EmitHost): string {
  return buildLuaLib(luaTarget).fullBundle
}

export function buildMinimalLualibBundle(
  features: Iterable<LuaLibFeature>,
  luaTarget: LuaTarget,
  emitHost: EmitHost
): string {
  const code = loadInlineLualibFeatures(features, luaTarget, emitHost)
  const moduleInfo = getLuaLibModulesInfo(luaTarget, emitHost)
  const exports = Array.from(features).flatMap((feature) => moduleInfo[feature].exports)

  return code + getLualibBundleReturn(exports)
}

export function findUsedLualibFeatures(
  luaTarget: LuaTarget,
  emitHost: EmitHost,
  luaContents: readonly string[]
): Set<LuaLibFeature> {
  const features = new Set<LuaLibFeature>()
  const exportToFeatureMap = getLuaLibExportToFeatureMap(luaTarget, emitHost)

  for (const lua of luaContents) {
    const regex = /^local (\w+) = ____lualib\.(\w+)$/gm
    for (const raw of lua.matchAll(regex)) {
      const [, localName, exportName] = LUALIB_LOCAL_MATCH_SCHEMA.parse(raw)
      if (localName !== exportName) continue
      const feature = exportToFeatureMap.get(exportName)
      if (feature != null) features.add(feature)
    }
  }

  return features
}
