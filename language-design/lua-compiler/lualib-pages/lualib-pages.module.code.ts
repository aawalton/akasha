import { existsSync, realpathSync } from "node:fs"
import { basename, join, resolve } from "node:path"
import { textAt, valueAt } from "@akasha/pages/page-value"
import { LuaLibFeature } from "../lualib-features/lualib-features.module.code.ts"

const PAGE = ".lualib.ts"

const CODE = ".lualib.code.ts"

const LUA50_CODE = ".lualib.lua50-code.ts"

const PAGES_FOLDER = "lualibs"

const PREFIX = "__TS__"

const FEATURES: ReadonlySet<string> = new Set<string>(Object.values(LuaLibFeature))

export type LualibPage = {
  readonly pagePath: string
  readonly luaExport: string
  readonly codePath: string
  readonly lua50CodePath: string | null
}

export type LualibSources = {
  readonly rootNames: readonly string[]
  readonly featureBySourceName: ReadonlyMap<string, LuaLibFeature>
}

function featureNamed(name: string): LuaLibFeature | null {
  if (FEATURES.has(name)) return name as LuaLibFeature
  const bare = name.startsWith(PREFIX) ? name.slice(PREFIX.length) : name
  return FEATURES.has(bare) ? (bare as LuaLibFeature) : null
}

function realAt(at: string): string {
  return existsSync(at) ? realpathSync(at) : at
}

export function lualibPagesRoot(): string {
  return join(realAt(resolve(import.meta.dir, "..")), PAGES_FOLDER)
}

export function pageAt(root: string, relative: string): LualibPage | null {
  const value = valueAt(relative, root)
  if (value === null) return null
  const luaExport = textAt(value, "luaExport")
  if (luaExport === null || luaExport === "") return null
  const stem = join(root, relative.slice(0, relative.length - PAGE.length))
  const codePath = `${stem}${CODE}`
  if (!existsSync(codePath)) return null
  const lua50CodePath = `${stem}${LUA50_CODE}`
  return {
    pagePath: join(root, relative),
    luaExport,
    codePath: realpathSync(codePath),
    lua50CodePath: existsSync(lua50CodePath) ? realpathSync(lua50CodePath) : null,
  }
}

export function pagesUnder(root: string): readonly LualibPage[] {
  if (!existsSync(root)) return []
  const pages: LualibPage[] = []
  for (const relative of new Bun.Glob(`**/*${PAGE}`).scanSync({ cwd: root })) {
    const page = pageAt(root, relative)
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
  if (pages.length === 0) return { rootNames: scanned, featureBySourceName }

  const stated = new Map<LuaLibFeature, string>()
  for (const page of pages) {
    const feature = featureNamed(page.luaExport)
    if (feature === null) {
      throw new Error(
        `lualib pages: ${page.pagePath} states lua-export "${page.luaExport}", which names no lualib feature`
      )
    }
    const lua50Path = page.lua50CodePath
    stated.set(feature, lua50 && lua50Path !== null ? lua50Path : page.codePath)
  }

  const taken = new Set<LuaLibFeature>()
  const rootNames: string[] = []
  for (const fileName of scanned) {
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

  return { rootNames, featureBySourceName }
}
