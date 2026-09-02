import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  addonBindingsPathIn,
  BINDINGS_FILE_NAME,
  GAME_METADATA_DIR,
  loadedDocumentPathsIn,
  namedFilePathsIn,
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

function documentUnder(dir: string, slug: string, kind: string, loadedAs: string | null): string {
  mkdirSync(join(dir, slug), { recursive: true })
  const named = loadedAs === null ? "" : `  loadedAs: ${JSON.stringify(loadedAs)},\n`
  writeFileSync(
    join(dir, slug, `${slug}.${kind}.ts`),
    `export const one = {\n  pageTypeSlug: ${JSON.stringify(kind)},\n  slug: ${JSON.stringify(slug)},\n${named}}\n`
  )
  return join(dir, slug)
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

test("a page states the name its manifest loads it by", async () => {
  const dir = addonFolderStating("")
  const under = documentUnder(dir, "next-boss-layout", "eso-interface", "TemperEvents.xml")
  const markup = join(under, "next-boss-layout.eso-interface.markup.xml")
  writeFileSync(markup, "<GuiXml></GuiXml>\n")
  expect((await loadedDocumentPathsIn(dir)).get("TemperEvents.xml")).toBe(markup)
})

test("a page loaded by a name whose own file is absent refuses the call", async () => {
  const dir = addonFolderStating("")
  documentUnder(dir, "next-boss-layout", "eso-interface", "TemperEvents.xml")
  await expect(loadedDocumentPathsIn(dir)).rejects.toThrow("TemperEvents.xml")
})

test("two pages loaded by one name refuse the call", async () => {
  const dir = addonFolderStating("")
  for (const slug of ["one-layout", "two-layout"]) {
    const under = documentUnder(dir, slug, "eso-interface", "TemperEvents.xml")
    writeFileSync(join(under, `${slug}.eso-interface.markup.xml`), "<GuiXml></GuiXml>\n")
  }
  await expect(loadedDocumentPathsIn(dir)).rejects.toThrow("TemperEvents.xml")
})

test("a page stating no name is loaded by none", async () => {
  const dir = addonFolderStating("")
  documentUnder(dir, "next-boss-layout", "eso-interface", null)
  expect((await loadedDocumentPathsIn(dir)).size).toBe(0)
})

test("a manifest name with a file beside the page takes that file", async () => {
  const dir = addonFolderStating("")
  writeFileSync(join(dir, "TemperCompanionsConfig.lua"), "TemperCompanionsConfig = nil\n")
  const found = await namedFilePathsIn(dir, ["TemperCompanionsConfig.lua"])
  expect(found.get("TemperCompanionsConfig.lua")).toBe(join(dir, "TemperCompanionsConfig.lua"))
})

test("a manifest name with a file under metadata takes that file", async () => {
  const dir = addonFolderStating("")
  mkdirSync(join(dir, GAME_METADATA_DIR, "XML"), { recursive: true })
  const held = join(dir, GAME_METADATA_DIR, "XML/Controls.xml")
  writeFileSync(held, "<GuiXml></GuiXml>\n")
  expect((await namedFilePathsIn(dir, ["XML/Controls.xml"])).get("XML/Controls.xml")).toBe(held)
})

test("a manifest name reaching no file there reaches the page loaded by that name", async () => {
  const dir = addonFolderStating("")
  const under = documentUnder(dir, "companions-config", "lua-module", "TemperCompanionsConfig.lua")
  const lua = join(under, "companions-config.lua-module.lua.lua")
  writeFileSync(lua, "TemperCompanionsConfig = nil\n")
  const found = await namedFilePathsIn(dir, ["TemperCompanionsConfig.lua"])
  expect(found.get("TemperCompanionsConfig.lua")).toBe(lua)
})

test("markup and Lua are reached by one rule rather than by a rule each", async () => {
  const dir = addonFolderStating("")
  const luaUnder = documentUnder(dir, "companions-config", "lua-module", "Config.lua")
  writeFileSync(join(luaUnder, "companions-config.lua-module.lua.lua"), "Config = nil\n")
  const xmlUnder = documentUnder(dir, "companions-layout", "eso-interface", "XML/Layout.xml")
  writeFileSync(join(xmlUnder, "companions-layout.eso-interface.markup.xml"), "<GuiXml></GuiXml>\n")
  const found = await namedFilePathsIn(dir, ["Config.lua", "XML/Layout.xml"])
  expect(found.size).toBe(2)
})

test("a manifest name no page is loaded by refuses the call", async () => {
  const dir = addonFolderStating("")
  const under = documentUnder(dir, "companions-config", "lua-module", "TemperCompanionsConfig.lua")
  writeFileSync(join(under, "companions-config.lua-module.lua.lua"), "\n")
  await expect(namedFilePathsIn(dir, ["One.lua"])).rejects.toThrow("One.lua")
})

test("a manifest naming no file answers nothing", async () => {
  const dir = addonFolderStating("")
  expect((await namedFilePathsIn(dir, [])).size).toBe(0)
})
