import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { bindings } from "@akasha/code-system/eso-addon/bindings"
import { readEsoAddonPage } from "../addon-tstl-config/addon-tstl-config.module.code.ts"

export const GAME_METADATA_DIR = "metadata"

export const BINDINGS_FILE_NAME = bindings.fileName

export const LUA_MODULE_SUFFIX = ".lua-module.lua.lua"

function bindingsFileIn(dir: string): string | null {
  const beside = join(dir, BINDINGS_FILE_NAME)
  if (existsSync(beside)) return beside
  const game = join(dir, GAME_METADATA_DIR, BINDINGS_FILE_NAME)
  return existsSync(game) ? game : null
}

export async function addonBindingsPathIn(dir: string): Promise<string | null> {
  const found = bindingsFileIn(dir)
  if (found !== null) return found
  const page = await readEsoAddonPage(dir)
  if (page === null || page.bindings === null) return null
  throw new Error(
    `addonBindingsPathIn: the page in ${dir} claims a ${BINDINGS_FILE_NAME}, and no such file is beside that page or under ${GAME_METADATA_DIR}/`
  )
}

const DOCUMENT_KINDS = [
  {
    pageTypeSlug: "eso-interface",
    pageSuffix: ".eso-interface.ts",
    fileSuffix: ".eso-interface.markup.xml",
  },
  { pageTypeSlug: "lua-module", pageSuffix: ".lua-module.ts", fileSuffix: LUA_MODULE_SUFFIX },
] as const

function loadedAsIn(loaded: Record<string, unknown>, pageTypeSlug: string): string | null {
  for (const value of Object.values(loaded)) {
    if (typeof value !== "object" || value === null) continue
    const said = value as { pageTypeSlug?: unknown; loadedAs?: unknown }
    if (said.pageTypeSlug !== pageTypeSlug) continue
    return typeof said.loadedAs === "string" ? said.loadedAs : null
  }
  return null
}

export async function loadedDocumentPathsIn(dir: string): Promise<ReadonlyMap<string, string>> {
  const answer = new Map<string, string>()
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return answer
  }
  for (const entry of [...entries].sort()) {
    for (const kind of DOCUMENT_KINDS) {
      const pagePath = join(dir, entry, `${entry}${kind.pageSuffix}`)
      if (!existsSync(pagePath)) continue
      const name = loadedAsIn(
        (await import(pagePath)) as Record<string, unknown>,
        kind.pageTypeSlug
      )
      if (name === null) continue
      const filePath = join(dir, entry, `${entry}${kind.fileSuffix}`)
      if (!existsSync(filePath)) {
        throw new Error(
          `loadedDocumentPathsIn: the page at ${pagePath} is loaded as "${name}", and ${filePath} is not there`
        )
      }
      const already = answer.get(name)
      if (already !== undefined) {
        throw new Error(
          `loadedDocumentPathsIn: two pages under ${dir} are both loaded as "${name}", ${already} and ${filePath}`
        )
      }
      answer.set(name, filePath)
    }
  }
  return answer
}

export async function namedFilePathOrNull(dir: string, one: string): Promise<string | null> {
  const beside = join(dir, one)
  if (existsSync(beside)) return beside
  const underGame = join(dir, GAME_METADATA_DIR, one)
  if (existsSync(underGame)) return underGame
  return (await loadedDocumentPathsIn(dir)).get(one) ?? null
}

export async function namedFilePathsIn(
  dir: string,
  named: readonly string[]
): Promise<ReadonlyMap<string, string>> {
  const answer = new Map<string, string>()
  const unreached: string[] = []
  let stated: ReadonlyMap<string, string> | null = null
  for (const one of named) {
    if (answer.has(one)) continue
    const beside = join(dir, one)
    if (existsSync(beside)) {
      answer.set(one, beside)
      continue
    }
    const underGame = join(dir, GAME_METADATA_DIR, one)
    if (existsSync(underGame)) {
      answer.set(one, underGame)
      continue
    }
    stated ??= await loadedDocumentPathsIn(dir)
    const held = stated.get(one)
    if (held === undefined) {
      unreached.push(one)
      continue
    }
    answer.set(one, held)
  }
  if (unreached.length > 0) {
    const names = [...(stated ?? new Map()).keys()]
    throw new Error(
      `namedFilePathsIn: the manifest in ${dir} loads ${String(unreached.length)} file(s) nothing there holds (${unreached.join(", ")}); none is beside the page, none is under ${GAME_METADATA_DIR}/, and the pages beside it are loaded as ${names.length === 0 ? "no name at all" : names.join(", ")}`
    )
  }
  return answer
}
