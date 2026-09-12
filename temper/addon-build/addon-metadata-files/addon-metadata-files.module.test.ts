import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  addonBindingsPathIn,
  BINDINGS_FILE_NAME,
  GAME_METADATA_DIR,
  loadedDocumentPathsIn,
  namedFilePathsIn,
} from "akasha/temper/addon-build/addon-metadata-files/addon-metadata-files.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

type Stating = { readonly root: string; readonly dir: string }

const ADDON_LEAF = "temper-companions-addon"

const ADDON_DIR = `akasha/temper/${ADDON_LEAF}`

const ADDON_PAGE = `${ADDON_DIR}/${ADDON_LEAF}.eso-addon.ts`

function addonPageFiled(said: Readonly<Record<string, string>>): Stating {
  const root = SCRATCH.rootFor("temper-addon-metadata-")
  const dir = join(root, ADDON_DIR)
  mkdirSync(dir, { recursive: true })
  valueAlsoFiled(root, "eso-addon", [{ path: ADDON_PAGE, value: { slug: ADDON_LEAF, ...said } }])
  return { root, dir }
}

function documentUnder(
  root: string,
  dir: string,
  slug: string,
  kind: string,
  loadedAs: string | null
): string {
  mkdirSync(join(dir, slug), { recursive: true })
  const value = loadedAs === null ? { slug } : { slug, loadedAs }
  valueAlsoFiled(root, kind, [{ path: `${ADDON_DIR}/${slug}/${slug}.${kind}.ts`, value }])
  return join(dir, slug)
}

test("an addon page claiming keybinds with no such file refuses the call", async () => {
  const { root, dir } = addonPageFiled({ bindings: "xml" })
  await expect(addonBindingsPathIn(root, dir)).rejects.toThrow(BINDINGS_FILE_NAME)
})

test("an akasha addon holds its keybinds beside the page", async () => {
  const { root, dir } = addonPageFiled({ bindings: "xml" })
  writeFileSync(join(dir, BINDINGS_FILE_NAME), "<Bindings></Bindings>\n")
  expect(await addonBindingsPathIn(root, dir)).toBe(join(dir, BINDINGS_FILE_NAME))
})

test("a game addon holds its keybinds under a metadata folder", async () => {
  const { root, dir } = addonPageFiled({})
  mkdirSync(join(dir, GAME_METADATA_DIR), { recursive: true })
  writeFileSync(join(dir, GAME_METADATA_DIR, BINDINGS_FILE_NAME), "<Bindings></Bindings>\n")
  expect(await addonBindingsPathIn(root, dir)).toBe(
    join(dir, GAME_METADATA_DIR, BINDINGS_FILE_NAME)
  )
})

test("an addon page claiming no keybinds answers that there are none", async () => {
  const { root, dir } = addonPageFiled({})
  expect(await addonBindingsPathIn(root, dir)).toBeNull()
})

test("a page states the name its manifest loads it by", () => {
  const { root, dir } = addonPageFiled({})
  const under = documentUnder(root, dir, "next-boss-layout", "eso-interface", "TemperEvents.xml")
  const markup = join(under, "next-boss-layout.eso-interface.markup.xml")
  writeFileSync(markup, "<GuiXml></GuiXml>\n")
  expect(loadedDocumentPathsIn(root, dir).get("TemperEvents.xml")).toBe(markup)
})

test("a page loaded by a name whose own file is absent refuses the call", () => {
  const { root, dir } = addonPageFiled({})
  documentUnder(root, dir, "next-boss-layout", "eso-interface", "TemperEvents.xml")
  expect(() => loadedDocumentPathsIn(root, dir)).toThrow("TemperEvents.xml")
})

test("two pages loaded by one name refuse the call", () => {
  const { root, dir } = addonPageFiled({})
  for (const slug of ["one-layout", "two-layout"]) {
    const under = documentUnder(root, dir, slug, "eso-interface", "TemperEvents.xml")
    writeFileSync(join(under, `${slug}.eso-interface.markup.xml`), "<GuiXml></GuiXml>\n")
  }
  expect(() => loadedDocumentPathsIn(root, dir)).toThrow("TemperEvents.xml")
})

test("a page stating no name is loaded by none", () => {
  const { root, dir } = addonPageFiled({})
  documentUnder(root, dir, "next-boss-layout", "eso-interface", null)
  expect(loadedDocumentPathsIn(root, dir).size).toBe(0)
})

test("a manifest name with a file beside the page takes that file", () => {
  const { root, dir } = addonPageFiled({})
  writeFileSync(join(dir, "TemperCompanionsConfig.lua"), "TemperCompanionsConfig = nil\n")
  const found = namedFilePathsIn(root, dir, ["TemperCompanionsConfig.lua"])
  expect(found.get("TemperCompanionsConfig.lua")).toBe(join(dir, "TemperCompanionsConfig.lua"))
})

test("a manifest name with a file under metadata takes that file", () => {
  const { root, dir } = addonPageFiled({})
  mkdirSync(join(dir, GAME_METADATA_DIR, "XML"), { recursive: true })
  const held = join(dir, GAME_METADATA_DIR, "XML/Controls.xml")
  writeFileSync(held, "<GuiXml></GuiXml>\n")
  expect(namedFilePathsIn(root, dir, ["XML/Controls.xml"]).get("XML/Controls.xml")).toBe(held)
})

test("a manifest name reaching no file there reaches the page loaded by that name", () => {
  const { root, dir } = addonPageFiled({})
  const under = documentUnder(
    root,
    dir,
    "companions-config",
    "lua-module",
    "TemperCompanionsConfig.lua"
  )
  const lua = join(under, "companions-config.lua-module.lua.lua")
  writeFileSync(lua, "TemperCompanionsConfig = nil\n")
  const found = namedFilePathsIn(root, dir, ["TemperCompanionsConfig.lua"])
  expect(found.get("TemperCompanionsConfig.lua")).toBe(lua)
})

test("markup and Lua are reached by one rule rather than by a rule each", () => {
  const { root, dir } = addonPageFiled({})
  const luaUnder = documentUnder(root, dir, "companions-config", "lua-module", "Config.lua")
  writeFileSync(join(luaUnder, "companions-config.lua-module.lua.lua"), "Config = nil\n")
  const xmlUnder = documentUnder(root, dir, "companions-layout", "eso-interface", "XML/Layout.xml")
  writeFileSync(join(xmlUnder, "companions-layout.eso-interface.markup.xml"), "<GuiXml></GuiXml>\n")
  const found = namedFilePathsIn(root, dir, ["Config.lua", "XML/Layout.xml"])
  expect(found.size).toBe(2)
})

test("a manifest name no page is loaded by refuses the call", () => {
  const { root, dir } = addonPageFiled({})
  const under = documentUnder(
    root,
    dir,
    "companions-config",
    "lua-module",
    "TemperCompanionsConfig.lua"
  )
  writeFileSync(join(under, "companions-config.lua-module.lua.lua"), "\n")
  expect(() => namedFilePathsIn(root, dir, ["One.lua"])).toThrow("One.lua")
})

test("a manifest naming no file answers nothing", () => {
  const { root, dir } = addonPageFiled({})
  expect(namedFilePathsIn(root, dir, []).size).toBe(0)
})
