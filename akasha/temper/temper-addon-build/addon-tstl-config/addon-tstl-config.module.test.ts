import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  bundleEntryPathIn,
  esoAddonPagePathIn,
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
      "/repo/temper/addons/types/eso/**/*.d.ts",
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
