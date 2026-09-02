import { existsSync } from "node:fs"
import { join } from "node:path"
import { bindings } from "@akasha/code-system/eso-addon/bindings"
import { readEsoAddonPage, slugBareOf } from "../addon-tstl-config/addon-tstl-config.module.code.ts"

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

export function luaModulePathIn(dir: string, slug: string): string {
  const bare = slugBareOf(slug)
  return join(dir, bare, `${bare}${LUA_MODULE_SUFFIX}`)
}

export async function additionalLuaPathsIn(
  dir: string,
  named: readonly string[]
): Promise<ReadonlyMap<string, string>> {
  const answer = new Map<string, string>()
  const owed: string[] = []
  for (const one of named) {
    const beside = join(dir, one)
    if (existsSync(beside)) {
      answer.set(one, beside)
      continue
    }
    owed.push(one)
  }
  const [onlyOwed, ...restOwed] = owed
  if (onlyOwed === undefined) return answer
  const page = await readEsoAddonPage(dir)
  const held = (page?.luaModuleSlugs ?? [])
    .map((one) => luaModulePathIn(dir, one))
    .filter((one) => existsSync(one))
  const [onlyHeld, ...restHeld] = held
  if (restOwed.length === 0 && onlyHeld !== undefined && restHeld.length === 0) {
    answer.set(onlyOwed, onlyHeld)
    return answer
  }
  throw new Error(
    `additionalLuaPathsIn: ${dir} names ${String(owed.length)} extra Lua file(s) its folder does not hold (${owed.join(", ")}) beside ${String(held.length)} Lua module(s) the page names (${held.join(", ")}), so which file each name reaches cannot be worked out`
  )
}
