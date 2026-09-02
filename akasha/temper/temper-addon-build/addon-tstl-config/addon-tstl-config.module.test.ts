import { afterAll, expect, test } from "bun:test"
import { mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  bundleEntryPathIn,
  esoAddonPagePathIn,
  reachedPackageDirs,
  tstlConfigBody,
  tstlConfigPathFor,
} from "./addon-tstl-config.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function addonFolderNaming(entrySlug: string | null): { root: string; dir: string } {
  const root = SCRATCH.rootFor("temper-addon-tstl-")
  const dir = join(root, "akasha/temper/temper-lib-table-functions")
  mkdirSync(join(dir, "table-functions-entry"), { recursive: true })
  writeFileSync(
    join(dir, "table-functions-entry/table-functions-entry.module.code.ts"),
    "export const ONE = 1\n"
  )
  const names = entrySlug === null ? "" : `  bundleEntrySlug: "${entrySlug}",\n`
  writeFileSync(
    join(dir, "temper-lib-table-functions.eso-addon.ts"),
    `export const temperLibTableFunctions = {\n  pageTypeSlug: "eso-addon",\n  slug: "temper-lib-table-functions",\n${names}}\n`
  )
  return { root, dir }
}

test("an addon page beside the manifest is found by its own file name", () => {
  const { dir } = addonFolderNaming("table-functions-entry")
  expect(esoAddonPagePathIn(dir)).toBe(join(dir, "temper-lib-table-functions.eso-addon.ts"))
  expect(esoAddonPagePathIn(join(dir, "gone"))).toBeNull()
})

test("a bundle entry slug becomes the path of that module's code", () => {
  expect(bundleEntryPathIn("/a/temper-lib-async", "async-main")).toBe(
    "/a/temper-lib-async/async-main/async-main.module.code.ts"
  )
})

test("the written settings name the entry, the bundle and the repository root", () => {
  const body: unknown = JSON.parse(
    tstlConfigBody({
      repoRoot: "/repo",
      addonDir: "/repo/akasha/temper/temper-lib-table-functions",
      canonicalName: "TemperTableFunctions",
      entryPath: "/repo/akasha/temper/temper-lib-table-functions/e/e.module.code.ts",
      reachedDirs: [],
    })
  )
  expect(body).toMatchObject({
    compilerOptions: {
      rootDir: "/repo",
      outDir: "/repo/temper/addons/dist/TemperTableFunctions",
      rewriteRelativeImportExtensions: true,
    },
    tstl: {
      luaBundle: "TemperTableFunctions.lua",
      luaBundleEntry: "/repo/akasha/temper/temper-lib-table-functions/e/e.module.code.ts",
      luaTarget: "5.1",
    },
    include: [
      "/repo/akasha/temper/temper-lib-table-functions/**/*.module.code.ts",
      "/repo/akasha/temper/temper-lib-table-functions/**/*.d.ts",
      "/repo/akasha/temper/temper-eso-types/**/*.d.ts",
      "/repo/akasha/temper/temper-addon-library-types/**/*.d.ts",
    ],
  })
})

test("an addon folder holding a tsconfig is built from the tsconfig held there", async () => {
  const { root, dir } = addonFolderNaming("table-functions-entry")
  writeFileSync(join(dir, "tsconfig.json"), "{}")
  expect(await tstlConfigPathFor(root, dir, "TemperTableFunctions")).toBe(
    join(dir, "tsconfig.json")
  )
})

test("an addon folder holding no tsconfig is built from settings written into the build output", async () => {
  const { root, dir } = addonFolderNaming("table-functions-entry")
  const path = await tstlConfigPathFor(root, dir, "TemperTableFunctions")
  expect(path).toBe(join(root, "temper/addons/dist/.tstl/TemperTableFunctions.tsconfig.json"))
})

test("an addon page naming no bundle entry answers that nothing can be built", async () => {
  const { root, dir } = addonFolderNaming(null)
  expect(await tstlConfigPathFor(root, dir, "TemperTableFunctions")).toBeNull()
})

test("a slug naming a page drops the page type spelled ahead of the slug", () => {
  expect(bundleEntryPathIn("/a/temper-interface-addon", "module/interface-entry")).toBe(
    "/a/temper-interface-addon/interface-entry/interface-entry.module.code.ts"
  )
})

test("an addon page naming a bundle entry the folder does not hold refuses the call", async () => {
  const { root, dir } = addonFolderNaming("gone-entry")
  await expect(tstlConfigPathFor(root, dir, "TemperTableFunctions")).rejects.toThrow("gone-entry")
})

function addonReaching(dependencyName: string): { root: string; dir: string; held: string } {
  const root = SCRATCH.rootFor("temper-addon-reach-")
  const dir = join(root, "akasha/temper/temper-collections-addon")
  const held = join(root, "akasha/temper/temper-lorebooks")
  mkdirSync(dir, { recursive: true })
  mkdirSync(held, { recursive: true })
  mkdirSync(join(root, "node_modules/@akasha"), { recursive: true })
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ dependencies: { [dependencyName]: "workspace:*", typescript: "^5.8.3" } })
  )
  writeFileSync(join(held, "package.json"), JSON.stringify({ name: dependencyName }))
  return { root, dir, held }
}

test("the packages an addon reaches are found through the links the workspace install left", () => {
  const { root, dir, held } = addonReaching("@akasha/temper-lorebooks")
  symlinkSync(held, join(root, "node_modules/@akasha/temper-lorebooks"))
  expect(reachedPackageDirs(root, dir)).toEqual([held])
})

test("a package the addon reaches that the install left no link for refuses the call", () => {
  const { root, dir } = addonReaching("@akasha/temper-lorebooks")
  expect(() => reachedPackageDirs(root, dir)).toThrow("@akasha/temper-lorebooks")
})

test("the written settings reach every declaration a package the addon reaches holds", () => {
  const body: unknown = JSON.parse(
    tstlConfigBody({
      repoRoot: "/repo",
      addonDir: "/repo/akasha/temper/temper-collections-addon",
      canonicalName: "TemperCollections",
      entryPath: "/repo/akasha/temper/temper-collections-addon/e/e.module.code.ts",
      reachedDirs: ["/repo/akasha/temper/temper-lorebooks"],
    })
  )
  expect(body).toMatchObject({
    include: [
      "/repo/akasha/temper/temper-collections-addon/**/*.module.code.ts",
      "/repo/akasha/temper/temper-collections-addon/**/*.d.ts",
      "/repo/akasha/temper/temper-lorebooks/**/*.d.ts",
      "/repo/akasha/temper/temper-eso-types/**/*.d.ts",
      "/repo/akasha/temper/temper-addon-library-types/**/*.d.ts",
    ],
  })
})
