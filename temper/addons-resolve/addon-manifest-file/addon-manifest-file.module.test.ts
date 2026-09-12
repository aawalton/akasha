import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/addon-manifest-file/addon-manifest-file.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const ESO_ADDON = "eso-addon"

const UNDER = "temper/held"

type Held = {
  readonly root: string
  readonly dir: string
}

function idOf(at: number): string {
  return `01a06060-0000-7000-8000-00000000000${String(at)}`
}

function folderHolding(slugs: readonly string[], names: readonly string[] = []): Held {
  const root = SCRATCH.rootFor("temper-addon-manifest-")
  const dir = join(root, UNDER)
  mkdirSync(dir, { recursive: true })
  for (const name of names) writeFileSync(join(dir, name), "{}")
  valueAlsoFiled(
    root,
    ESO_ADDON,
    slugs.map((slug, at) => ({
      path: `${UNDER}/${slug}.${ESO_ADDON}.ts`,
      value: { id: idOf(at), pageTypeSlug: ESO_ADDON, slug, addonManifest: "json" },
    }))
  )
  return { root, dir }
}

test("an addon folder outside akasha states itself in a file named addon.json", () => {
  const { root, dir } = folderHolding([], ["addon.json"])
  expect(addonManifestPathIn(root, dir)).toBe(join(dir, "addon.json"))
})

test("an akasha package states itself in the manifest file beside its own page", () => {
  const { root, dir } = folderHolding(["temper-lib-async"])
  expect(addonManifestPathIn(root, dir)).toBe(
    join(dir, `temper-lib-async.${ESO_ADDON}.addon-manifest.json`)
  )
})

test("the page is asked of the index rather than found by reading the folder", () => {
  const { root, dir } = folderHolding(["temper-lib-async"])
  writeFileSync(join(dir, `temper-lib-gps.${ESO_ADDON}.addon-manifest.json`), "{}")
  expect(addonManifestPathIn(root, dir)).toBe(
    join(dir, `temper-lib-async.${ESO_ADDON}.addon-manifest.json`)
  )
})

test("a folder holding both spellings answers with addon.json", () => {
  const { root, dir } = folderHolding(["temper-lib-async"], ["addon.json"])
  expect(addonManifestPathIn(root, dir)).toBe(join(dir, "addon.json"))
})

test("a folder holding neither spelling answers that no addon is there", () => {
  const { root, dir } = folderHolding([], ["package.json"])
  expect(addonManifestPathIn(root, dir)).toBeNull()
  expect(addonManifestPathIn(root, join(dir, "gone"))).toBeNull()
})

test("a folder outside the checkout answers that no addon is there", () => {
  const { root } = folderHolding(["temper-lib-async"])
  expect(addonManifestPathIn(root, join(root, "..", "elsewhere"))).toBeNull()
})

test("a folder holding two addon pages carrying a manifest is thrown on", () => {
  const { root, dir } = folderHolding(["temper-lib-async", "temper-lib-map-ping"])
  expect(() => addonManifestPathIn(root, dir)).toThrow("one folder holds one addon")
})
