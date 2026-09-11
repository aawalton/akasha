import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import {
  assertSafeSiblingName,
  readSiblingAddonNames,
  siblingDistDir,
  siblingManifestsIn,
  siblingSourceDir,
} from "akasha/temper/addons-resolve/sibling-addons/sibling-addons.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ESO_ADDON = "eso-addon"

const UNDER = "temper/held"

type Held = {
  readonly root: string
  readonly dir: string
}

function addonDir(slug: string | null): Held {
  const root = scratch.rootFor("temper-sibling-")
  const dir = join(root, UNDER)
  mkdirSync(dir, { recursive: true })
  valueAlsoFiled(
    root,
    ESO_ADDON,
    slug === null
      ? []
      : [
          {
            path: `${UNDER}/${slug}.${ESO_ADDON}.ts`,
            value: {
              id: "01a06060-0000-7000-8000-000000000001",
              pageTypeSlug: ESO_ADDON,
              slug,
              siblingManifest: "json",
            },
          },
        ]
  )
  return { root, dir }
}

function addonDirWith(body: string): Held {
  const held = addonDir(null)
  writeFileSync(join(held.dir, "addon.json"), body)
  return held
}

test("a name carrying anything but a bare folder name is refused", () => {
  expect(() => assertSafeSiblingName("../evil")).toThrow("no usable addon folder name")
  expect(() => assertSafeSiblingName(".")).toThrow()
  expect(() => assertSafeSiblingName("a/b")).toThrow()
  expect(assertSafeSiblingName("LibZone")).toBeUndefined()
})

test("a sibling is named in the addon's own addon.json", () => {
  const { root, dir } = addonDirWith(JSON.stringify({ siblingAddons: ["LibZone"] }))
  expect(readSiblingAddonNames(root, dir)).toEqual(["LibZone"])
})

test("an addon with no readable addon.json ships no sibling", () => {
  const broken = addonDirWith("{ not json")
  expect(readSiblingAddonNames(broken.root, broken.dir)).toEqual([])
  const bare = addonDir(null)
  expect(readSiblingAddonNames(bare.root, join(bare.dir, "gone"))).toEqual([])
})

test("a sibling's source sits in a siblings folder inside the addon", () => {
  expect(siblingSourceDir("/a", "LibZone")).toBe("/a/siblings/LibZone")
  expect(siblingDistDir("/root", "LibZone")).toBe("/root/dist/LibZone")
})

test("a sibling's manifest is carried by the page of the addon shipping it", () => {
  const { root, dir } = addonDir("temper-lib-zone")
  writeFileSync(
    join(dir, `temper-lib-zone.${ESO_ADDON}.sibling-manifest.json`),
    JSON.stringify({ "LibZone-1.0": "## Title: LibZone-1.0\r\n" })
  )
  expect([...siblingManifestsIn(root, dir)]).toEqual([["LibZone-1.0", "## Title: LibZone-1.0\r\n"]])
})

test("an addon whose page carries no sibling manifest ships no sibling", () => {
  const { root, dir } = addonDir(null)
  expect(siblingManifestsIn(root, dir).size).toBe(0)
  expect(siblingManifestsIn(root, join(dir, "gone")).size).toBe(0)
})

test("a manifest the addon's page does not carry ships no sibling", () => {
  const { root, dir } = addonDir(null)
  writeFileSync(
    join(dir, `temper-lib-zone.${ESO_ADDON}.sibling-manifest.json`),
    JSON.stringify({ "LibZone-1.0": "## Title: LibZone-1.0\r\n" })
  )
  expect(siblingManifestsIn(root, dir).size).toBe(0)
})
