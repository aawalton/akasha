import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { addonManifestPathIn } from "./addon-manifest-file.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function folderHolding(names: readonly string[]): string {
  const dir = SCRATCH.rootFor("temper-addon-manifest-")
  for (const name of names) writeFileSync(join(dir, name), "{}")
  return dir
}

test("an addon folder outside akasha states itself in a file named addon.json", () => {
  const dir = folderHolding(["addon.json"])
  expect(addonManifestPathIn(dir)).toBe(join(dir, "addon.json"))
})

test("an akasha package states itself in the manifest file beside its own page", () => {
  const dir = folderHolding(["temper-lib-async.eso-addon.addon-manifest.json"])
  expect(addonManifestPathIn(dir)).toBe(join(dir, "temper-lib-async.eso-addon.addon-manifest.json"))
})

test("a folder holding both spellings answers with addon.json", () => {
  const dir = folderHolding(["addon.json", "temper-lib-async.eso-addon.addon-manifest.json"])
  expect(addonManifestPathIn(dir)).toBe(join(dir, "addon.json"))
})

test("a folder holding neither spelling answers that no addon is there", () => {
  expect(addonManifestPathIn(folderHolding(["package.json"]))).toBeNull()
  expect(addonManifestPathIn(join(SCRATCH.rootFor("temper-addon-manifest-"), "gone"))).toBeNull()
})

test("a folder holding two manifests beside pages is thrown on", () => {
  const dir = folderHolding([
    "temper-lib-async.eso-addon.addon-manifest.json",
    "temper-lib-map-ping.eso-addon.addon-manifest.json",
  ])
  expect(() => addonManifestPathIn(dir)).toThrow("one folder holds one addon")
})
