import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { put, there } from "@akasha/testing-system/putting"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { clearedOff, emptiedBy, wouldClear } from "./folder-clearing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const DEEP = "akasha/one/deep/held.module.ts"

const KEPT = "akasha/two/kept.module.ts"

const SOLO = "solo/one/held.module.ts"

const BODY = "export const held = 1\n"

function world(...paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-clearing-")
  for (const path of paths) put(root, path, BODY)
  return root
}

test("the folders a change could empty climb from what went up to the repository top", () => {
  expect(emptiedBy([DEEP])).toEqual(["akasha/one/deep", "akasha/one", "akasha"])
  expect(emptiedBy(["akasha/held.module.ts"])).toEqual(["akasha"])
  expect(emptiedBy(["temper/one/deep/held.ts"])).toEqual([
    "temper/one/deep",
    "temper/one",
    "temper",
  ])
  expect(emptiedBy(["held.ts"])).toEqual([])
})

test("a folder at the top of the repository goes where the change leaves it holding nothing", () => {
  const root = world(SOLO)
  rmSync(join(root, SOLO))
  expect(clearedOff(root, [SOLO])).toEqual(["solo/one", "solo"])
  expect(there(root, "solo")).toBe(false)
})

test("a folder left holding nothing goes, and the folder above it goes with it", () => {
  const root = world(DEEP, KEPT)
  expect(wouldClear(root, [DEEP])).toEqual(["akasha/one/deep", "akasha/one"])
  rmSync(join(root, DEEP))
  expect(clearedOff(root, [DEEP])).toEqual(["akasha/one/deep", "akasha/one"])
  expect(there(root, "akasha/one")).toBe(false)
  expect(there(root, "akasha")).toBe(true)
  expect(there(root, KEPT)).toBe(true)
})

test("a folder holding a file nothing took is kept, and so is the folder above that folder", () => {
  const root = world(DEEP, "akasha/one/loose.txt")
  rmSync(join(root, DEEP))
  expect(clearedOff(root, [DEEP])).toEqual(["akasha/one/deep"])
  expect(there(root, "akasha/one/deep")).toBe(false)
  expect(there(root, "akasha/one/loose.txt")).toBe(true)
  expect(there(root, "akasha/one")).toBe(true)
})

test("a folder the change leaves a file behind in is named by neither answer", () => {
  const root = world(DEEP, "akasha/one/deep/kept.module.ts")
  expect(wouldClear(root, [DEEP])).toEqual([])
  rmSync(join(root, DEEP))
  expect(clearedOff(root, [DEEP])).toEqual([])
  expect(there(root, "akasha/one/deep")).toBe(true)
})

test("a folder that is not there is passed over rather than answered for", () => {
  const root = world(KEPT)
  expect(clearedOff(root, [DEEP])).toEqual([])
  expect(there(root, KEPT)).toBe(true)
})
