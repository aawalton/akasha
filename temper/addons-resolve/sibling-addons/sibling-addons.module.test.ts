import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  assertSafeSiblingName,
  readSiblingAddonNames,
  siblingDistDir,
  siblingManifestsIn,
  siblingSourceDir,
} from "./sibling-addons.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function addonDirWith(body: string): string {
  const dir = scratch.rootFor("temper-sibling-")
  writeFileSync(join(dir, "addon.json"), body)
  return dir
}

test("a name carrying anything but a bare folder name is refused", () => {
  expect(() => assertSafeSiblingName("../evil")).toThrow("no usable addon folder name")
  expect(() => assertSafeSiblingName(".")).toThrow()
  expect(() => assertSafeSiblingName("a/b")).toThrow()
  expect(assertSafeSiblingName("LibZone")).toBeUndefined()
})

test("a sibling is named in the addon's own addon.json", () => {
  expect(
    readSiblingAddonNames(addonDirWith(JSON.stringify({ siblingAddons: ["LibZone"] })))
  ).toEqual(["LibZone"])
})

test("an addon with no readable addon.json ships no sibling", () => {
  expect(readSiblingAddonNames(addonDirWith("{ not json"))).toEqual([])
  expect(readSiblingAddonNames(join(scratch.rootFor("temper-sibling-"), "gone"))).toEqual([])
})

test("a sibling's source sits in a siblings folder inside the addon", () => {
  expect(siblingSourceDir("/a", "LibZone")).toBe("/a/siblings/LibZone")
  expect(siblingDistDir("/root", "LibZone")).toBe("/root/dist/LibZone")
})

test("a sibling's manifest is carried by the page of the addon shipping it", () => {
  const dir = scratch.rootFor("temper-sibling-")
  writeFileSync(
    join(dir, "temper-lib-zone.eso-addon.sibling-manifest.json"),
    JSON.stringify({ "LibZone-1.0": "## Title: LibZone-1.0\r\n" })
  )
  expect([...siblingManifestsIn(dir)]).toEqual([["LibZone-1.0", "## Title: LibZone-1.0\r\n"]])
})

test("an addon carrying no sibling manifest ships no sibling", () => {
  expect(siblingManifestsIn(scratch.rootFor("temper-sibling-")).size).toBe(0)
  expect(siblingManifestsIn(join(scratch.rootFor("temper-sibling-"), "gone")).size).toBe(0)
})
