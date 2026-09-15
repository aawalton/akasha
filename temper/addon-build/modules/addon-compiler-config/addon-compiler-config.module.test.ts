import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import {
  bundleEntryPathIn,
  compilerConfigBody,
  compilerConfigPathFor,
  declaringDirs,
  reachedAddonDirs,
} from "akasha/temper/addon-build/modules/addon-compiler-config/addon-compiler-config.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const ESO_ADDON = "eso-addon"

const DECLARATION = "type-declaration"

const NAMING_LEAF = "temper-lib-table-functions"

const ENTRY_LEAF = "table-functions-entry"

const MODULE = "module"

const NAMING_PAGE = `akasha/temper/${NAMING_LEAF}/${NAMING_LEAF}.eso-addon.ts`

const ENTRY_UNDER = `akasha/temper/${NAMING_LEAF}/modules/${ENTRY_LEAF}`

const ENTRY_PAGE = `${ENTRY_UNDER}/${ENTRY_LEAF}.module.ts`

const ENTRY_CODE = `${ENTRY_UNDER}/${ENTRY_LEAF}.module.code.ts`

const ENTRY_ID = "01a09600-0000-7000-8000-000000000001"

function addonFolderNaming(entrySlug: string | null): { root: string; dir: string } {
  const root = SCRATCH.rootFor("temper-addon-compiler-")
  const dir = join(root, `akasha/temper/${NAMING_LEAF}`)
  mkdirSync(join(root, ENTRY_UNDER), { recursive: true })
  listedFiled(root, MODULE, ENTRY_LEAF, [{ path: ENTRY_PAGE, id: ENTRY_ID }])
  valueAlsoFiled(root, MODULE, [
    { path: ENTRY_PAGE, value: { id: ENTRY_ID, slug: ENTRY_LEAF, code: "ts" } },
  ])
  writeFileSync(join(root, ENTRY_CODE), "export const ONE = 1\n")
  const value =
    entrySlug === null ? { slug: NAMING_LEAF } : { slug: NAMING_LEAF, bundleEntry: entrySlug }
  valueAlsoFiled(root, ESO_ADDON, [{ path: NAMING_PAGE, value }])
  return { root, dir }
}

test("a bundle entry slug becomes the path the index answers for that module's code", () => {
  const { root } = addonFolderNaming(ENTRY_LEAF)
  expect(bundleEntryPathIn(root, ENTRY_LEAF)).toBe(join(root, ENTRY_CODE))
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
      outDir: "/repo/temper/addon-build/dist/TemperTableFunctions",
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
    join(root, "temper/addon-build/dist/.lua-compiler/TemperTableFunctions.tsconfig.json")
  )
})

test("an addon page naming no bundle entry answers that nothing can be built", async () => {
  const { root, dir } = addonFolderNaming(null)
  expect(await compilerConfigPathFor(root, dir, "TemperTableFunctions")).toBeNull()
})

test("a slug naming a page drops the page type spelled ahead of the slug", () => {
  const { root } = addonFolderNaming(`${MODULE}/${ENTRY_LEAF}`)
  expect(bundleEntryPathIn(root, `${MODULE}/${ENTRY_LEAF}`)).toBe(join(root, ENTRY_CODE))
})

test("an addon page naming a bundle entry no module page carries refuses the call", async () => {
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
