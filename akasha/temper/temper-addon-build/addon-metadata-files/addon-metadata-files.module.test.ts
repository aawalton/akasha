import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  additionalLuaPathsIn,
  addonBindingsPathIn,
  BINDINGS_FILE_NAME,
  GAME_METADATA_DIR,
  luaModulePathIn,
} from "./addon-metadata-files.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function addonFolderStating(said: string): string {
  const root = SCRATCH.rootFor("temper-addon-metadata-")
  const dir = join(root, "akasha/temper/temper-companions-addon")
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, "temper-companions-addon.eso-addon.ts"),
    `export const temperCompanionsAddon = {\n  pageTypeSlug: "eso-addon",\n  slug: "temper-companions-addon",\n${said}}\n`
  )
  return dir
}

test("an addon page claiming keybinds with no such file refuses the call", async () => {
  const dir = addonFolderStating(`  bindings: "xml",\n`)
  await expect(addonBindingsPathIn(dir)).rejects.toThrow(BINDINGS_FILE_NAME)
})

test("an akasha addon holds its keybinds beside the page", async () => {
  const dir = addonFolderStating(`  bindings: "xml",\n`)
  writeFileSync(join(dir, BINDINGS_FILE_NAME), "<Bindings></Bindings>\n")
  expect(await addonBindingsPathIn(dir)).toBe(join(dir, BINDINGS_FILE_NAME))
})

test("a game addon holds its keybinds under a metadata folder", async () => {
  const dir = addonFolderStating("")
  mkdirSync(join(dir, GAME_METADATA_DIR), { recursive: true })
  writeFileSync(join(dir, GAME_METADATA_DIR, BINDINGS_FILE_NAME), "<Bindings></Bindings>\n")
  expect(await addonBindingsPathIn(dir)).toBe(join(dir, GAME_METADATA_DIR, BINDINGS_FILE_NAME))
})

test("an addon page claiming no keybinds answers that there are none", async () => {
  const dir = addonFolderStating("")
  expect(await addonBindingsPathIn(dir)).toBeNull()
})

test("a lua module slug becomes the path of that module's lua", () => {
  expect(luaModulePathIn("/a/temper-companions-addon", "lua-module/companions-config")).toBe(
    "/a/temper-companions-addon/companions-config/companions-config.lua-module.lua.lua"
  )
})

test("an extra lua file beside the page is taken from beside the page", async () => {
  const dir = addonFolderStating("")
  writeFileSync(join(dir, "TemperCompanionsConfig.lua"), "TemperCompanionsConfig = nil\n")
  const found = await additionalLuaPathsIn(dir, ["TemperCompanionsConfig.lua"])
  expect(found.get("TemperCompanionsConfig.lua")).toBe(join(dir, "TemperCompanionsConfig.lua"))
})

test("a manifest name with no file beside the page reaches the lua module the page names", async () => {
  const dir = addonFolderStating(`  luaModuleSlugs: ["lua-module/companions-config"],\n`)
  mkdirSync(join(dir, "companions-config"), { recursive: true })
  const path = join(dir, "companions-config/companions-config.lua-module.lua.lua")
  writeFileSync(path, "TemperCompanionsConfig = nil\n")
  const found = await additionalLuaPathsIn(dir, ["TemperCompanionsConfig.lua"])
  expect(found.get("TemperCompanionsConfig.lua")).toBe(path)
})

test("a pairing of manifest names to lua modules that is not forced refuses the call", async () => {
  const dir = addonFolderStating(`  luaModuleSlugs: ["lua-module/companions-config"],\n`)
  mkdirSync(join(dir, "companions-config"), { recursive: true })
  writeFileSync(join(dir, "companions-config/companions-config.lua-module.lua.lua"), "\n")
  await expect(additionalLuaPathsIn(dir, ["One.lua", "Two.lua"])).rejects.toThrow("One.lua")
})

test("a manifest naming no extra lua answers nothing", async () => {
  const dir = addonFolderStating("")
  expect((await additionalLuaPathsIn(dir, [])).size).toBe(0)
})
