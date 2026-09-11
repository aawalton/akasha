import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import {
  bundleEntryPathIn,
  compilerConfigBody,
  compilerConfigPathFor,
  declaringDirs,
  esoAddonPagePathIn,
  reachedAddonDirs,
} from "akasha/temper/addon-build/addon-compiler-config/addon-compiler-config.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const ESO_ADDON = "eso-addon"

const DECLARATION = "type-declaration"

const NAMING_LEAF = "temper-lib-table-functions"

const ENTRY_LEAF = "table-functions-entry"

const NAMING_PAGE = `akasha/temper/${NAMING_LEAF}/${NAMING_LEAF}.eso-addon.ts`

function addonFolderNaming(entrySlug: string | null): { root: string; dir: string } {
  const root = SCRATCH.rootFor("temper-addon-compiler-")
  const dir = join(root, `akasha/temper/${NAMING_LEAF}`)
  mkdirSync(join(dir, ENTRY_LEAF), { recursive: true })
  writeFileSync(bundleEntryPathIn(dir, ENTRY_LEAF), "export const ONE = 1\n")
  const value =
    entrySlug === null ? { slug: NAMING_LEAF } : { slug: NAMING_LEAF, bundleEntry: entrySlug }
  valueAlsoFiled(root, ESO_ADDON, [{ path: NAMING_PAGE, value }])
  return { root, dir }
}

test("an addon page beside the manifest is found by its own file name", () => {
  const { root, dir } = addonFolderNaming("table-functions-entry")
  expect(esoAddonPagePathIn(root, dir)).toBe(join(dir, `${NAMING_LEAF}.eso-addon.ts`))
  expect(esoAddonPagePathIn(root, join(dir, "gone"))).toBeNull()
})

test("a bundle entry slug becomes the path of that module's code", () => {
  expect(bundleEntryPathIn("/a/temper-lib-async", "async-main")).toBe(
    "/a/temper-lib-async/async-main/async-main.module.code.ts"
  )
})

test("the written settings name the entry, the bundle and the repository root", () => {
  const body: unknown = JSON.parse(
    compilerConfigBody({
      repoRoot: "/repo",
      addonDir: "/repo/temper/temper-lib-table-functions",
      canonicalName: "TemperTableFunctions",
      entryPath: "/repo/temper/temper-lib-table-functions/e/e.module.code.ts",
      reachedDirs: [],
      declaringDirs: ["/repo/temper/temper-eso-types", "/repo/temper/temper-addon-library-types"],
    })
  )
  expect(body).toMatchObject({
    compilerOptions: {
      rootDir: "/repo",
      outDir: "/repo/temper/addons/dist/TemperTableFunctions",
      noEmit: true,
    },
    luaCompiler: {
      luaBundle: "TemperTableFunctions.lua",
      luaBundleEntry: "/repo/temper/temper-lib-table-functions/e/e.module.code.ts",
      luaTarget: "5.1",
      noEmitLua: false,
    },
    include: [
      "/repo/temper/temper-lib-table-functions/**/*.module.code.ts",
      "/repo/temper/temper-lib-table-functions/**/*.d.ts",
      "/repo/temper/temper-eso-types/**/*.type-declaration.d.ts",
      "/repo/temper/temper-addon-library-types/**/*.type-declaration.d.ts",
    ],
  })
})

test("an addon folder holding a tsconfig is built from the tsconfig held there", async () => {
  const { root, dir } = addonFolderNaming("table-functions-entry")
  writeFileSync(join(dir, "tsconfig.json"), "{}")
  expect(await compilerConfigPathFor(root, dir, "TemperTableFunctions")).toBe(
    join(dir, "tsconfig.json")
  )
})

test("an addon folder holding no tsconfig is built from settings written into the build output", async () => {
  const { root, dir } = addonFolderNaming("table-functions-entry")
  const path = await compilerConfigPathFor(root, dir, "TemperTableFunctions")
  expect(path).toBe(
    join(root, "temper/addons/dist/.lua-compiler/TemperTableFunctions.tsconfig.json")
  )
})

test("an addon page naming no bundle entry answers that nothing can be built", async () => {
  const { root, dir } = addonFolderNaming(null)
  expect(await compilerConfigPathFor(root, dir, "TemperTableFunctions")).toBeNull()
})

test("a slug naming a page drops the page type spelled ahead of the slug", () => {
  expect(bundleEntryPathIn("/a/temper-interface-addon", "module/interface-entry")).toBe(
    "/a/temper-interface-addon/interface-entry/interface-entry.module.code.ts"
  )
})

test("an addon page naming a bundle entry the folder does not hold refuses the call", async () => {
  const { root, dir } = addonFolderNaming("gone-entry")
  await expect(compilerConfigPathFor(root, dir, "TemperTableFunctions")).rejects.toThrow(
    "gone-entry"
  )
})

function addonReaching(
  dependedOn: string,
  heldName: string
): { root: string; dir: string; held: string } {
  const root = SCRATCH.rootFor("temper-addon-reach-")
  const dir = join(root, "temper/temper-collections-addon")
  const held = join(root, "temper/temper-lorebooks")
  mkdirSync(dir, { recursive: true })
  mkdirSync(held, { recursive: true })
  writeFileSync(
    join(dir, "temper-collections-addon.eso-addon.addon-manifest.json"),
    JSON.stringify({ name: "TemperCollections", dependsOn: [`${dependedOn}>=3`] })
  )
  writeFileSync(
    join(held, "temper-lorebooks.eso-addon.addon-manifest.json"),
    JSON.stringify({ name: heldName })
  )
  valueAlsoFiled(root, ESO_ADDON, [
    {
      path: "temper/temper-collections-addon/temper-collections-addon.eso-addon.ts",
      value: { slug: "temper-collections-addon", addonManifest: "json" },
    },
    {
      path: "temper/temper-lorebooks/temper-lorebooks.eso-addon.ts",
      value: { slug: "temper-lorebooks", addonManifest: "json" },
    },
  ])
  return { root, dir, held }
}

test("an addon depended on is found by the name that addon's own manifest states", () => {
  const { root, dir, held } = addonReaching("TemperLorebooks", "TemperLorebooks")
  expect(reachedAddonDirs(root, dir)).toEqual([held])
})

test("a dependency no addon in the checkout carries is left out of the compile", () => {
  const { root, dir } = addonReaching("MasterMerchant", "TemperLorebooks")
  expect(reachedAddonDirs(root, dir)).toEqual([])
})

test("the written settings reach every declaration an addon this addon depends on holds", () => {
  const body: unknown = JSON.parse(
    compilerConfigBody({
      repoRoot: "/repo",
      addonDir: "/repo/temper/temper-collections-addon",
      canonicalName: "TemperCollections",
      entryPath: "/repo/temper/temper-collections-addon/e/e.module.code.ts",
      reachedDirs: ["/repo/temper/temper-lorebooks"],
      declaringDirs: ["/repo/temper/temper-eso-types"],
    })
  )
  expect(body).toMatchObject({
    include: [
      "/repo/temper/temper-collections-addon/**/*.module.code.ts",
      "/repo/temper/temper-collections-addon/**/*.d.ts",
      "/repo/temper/temper-lorebooks/**/*.d.ts",
      "/repo/temper/temper-eso-types/**/*.type-declaration.d.ts",
    ],
  })
})

test("a temper folder holding declarations and no addon page is read by every addon", () => {
  const root = SCRATCH.rootFor("temper-addon-declaring-")
  valueAlsoFiled(root, ESO_ADDON, [
    {
      path: "temper/temper-characters-addon/temper-characters-addon.eso-addon.ts",
      value: { slug: "temper-characters-addon" },
    },
  ])
  valueAlsoFiled(root, DECLARATION, [
    {
      path: "temper/skill-point-finder/controls/controls.type-declaration.ts",
      value: { slug: "controls" },
    },
    {
      path: "temper/temper-characters-addon/entry/entry.type-declaration.ts",
      value: { slug: "entry" },
    },
  ])
  expect(declaringDirs(root)).toEqual([join(root, "temper/skill-point-finder")])
})
