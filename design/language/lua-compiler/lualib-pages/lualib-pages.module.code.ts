import { existsSync, realpathSync } from "node:fs"
import { basename, join } from "node:path"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE = ".lualib.ts"

const CODE = ".lualib.code.ts"

const LUA50_CODE = ".lualib.lua50-code.ts"

const TYPE = "lualib"

const PREFIX = "__TS__"

const FEATURES: ReadonlySet<string> = new Set<string>(Object.values(LuaLibFeature))

export type LualibPage = {
  readonly pagePath: string
  readonly luaExport: string
  readonly luaFeature?: string | null
  readonly codePath: string
  readonly lua50CodePath: string | null
}

export type LualibSources = {
  readonly rootNames: readonly string[]
  readonly featureBySourceName: ReadonlyMap<string, LuaLibFeature>
  readonly takenInstead: ReadonlyMap<string, string>
}

function featureNamed(name: string): LuaLibFeature | null {
  if (FEATURES.has(name)) return name as LuaLibFeature
  const bare = name.startsWith(PREFIX) ? name.slice(PREFIX.length) : name
  if (FEATURES.has(bare)) return bare as LuaLibFeature
  const upper = bare.charAt(0).toUpperCase() + bare.slice(1)
  return FEATURES.has(upper) ? (upper as LuaLibFeature) : null
}

function pageOf(root: string, relative: string, value: Value): LualibPage | null {
  const luaExport = textAt(value, "luaExport")
  if (luaExport === null || luaExport === "") return null
  const stem = join(root, relative.slice(0, relative.length - PAGE.length))
  const codePath = `${stem}${CODE}`
  if (!existsSync(codePath)) return null
  const lua50CodePath = `${stem}${LUA50_CODE}`
  const luaFeature = textAt(value, "luaFeature")
  return {
    pagePath: join(root, relative),
    luaExport,
    luaFeature: luaFeature === null || luaFeature === "" ? null : luaFeature,
    codePath: realpathSync(codePath),
    lua50CodePath: existsSync(lua50CodePath) ? realpathSync(lua50CodePath) : null,
  }
}

export function lualibPages(): readonly LualibPage[] {
  const root = akashaRoot()
  const pages: LualibPage[] = []
  for (const one of valuesOfType(root, TYPE)) {
    const page = pageOf(root, one.path, one.value)
    if (page !== null) pages.push(page)
  }
  return pages.sort((one, other) => (one.luaExport < other.luaExport ? -1 : 1))
}

export function sourcesFrom(
  scanned: readonly string[],
  pages: readonly LualibPage[],
  lua50: boolean
): LualibSources {
  const featureBySourceName = new Map<string, LuaLibFeature>()
  const takenInstead = new Map<string, string>()
  if (pages.length === 0) return { rootNames: scanned, featureBySourceName, takenInstead }

  const stated = new Map<LuaLibFeature, string>()
  const claimedBy = new Map<LuaLibFeature, string>()
  for (const page of pages) {
    const named = page.luaFeature ?? page.luaExport
    const feature = featureNamed(named)
    if (feature === null) {
      throw new Error(
        `lualib pages: ${page.pagePath} names "${named}", which names no lualib feature`
      )
    }
    const taken = claimedBy.get(feature)
    if (taken !== undefined) {
      throw new Error(
        `lualib pages: ${taken} and ${page.pagePath} both name the lualib feature "${feature}"`
      )
    }
    claimedBy.set(feature, page.pagePath)
    const lua50Path = page.lua50CodePath
    if (lua50 && lua50Path !== null) {
      stated.set(feature, lua50Path)
      takenInstead.set(page.codePath, lua50Path)
      featureBySourceName.set(basename(page.codePath, ".ts"), feature)
    } else {
      stated.set(feature, page.codePath)
    }
  }

  const fromPages = new Set<string>()
  for (const page of pages) {
    fromPages.add(basename(page.codePath, ".ts"))
    const lua50Path = page.lua50CodePath
    if (lua50Path !== null) fromPages.add(basename(lua50Path, ".ts"))
  }

  const taken = new Set<LuaLibFeature>()
  const rootNames: string[] = []
  for (const fileName of scanned) {
    if (fromPages.has(basename(fileName, ".ts"))) continue
    const feature = featureNamed(basename(fileName, ".ts"))
    const source = feature === null ? undefined : stated.get(feature)
    if (feature === null || source === undefined) {
      rootNames.push(fileName)
      continue
    }
    if (taken.has(feature)) continue
    taken.add(feature)
    rootNames.push(source)
    featureBySourceName.set(basename(source, ".ts"), feature)
  }

  for (const [feature, source] of stated) {
    if (taken.has(feature)) continue
    rootNames.push(source)
    featureBySourceName.set(basename(source, ".ts"), feature)
  }

  return { rootNames, featureBySourceName, takenInstead }
}
