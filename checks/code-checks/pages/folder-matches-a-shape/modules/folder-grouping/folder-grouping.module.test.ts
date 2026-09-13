import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import {
  groupedOver,
  holdsNothing,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const BYTES = new Uint8Array()

const NOWHERE = "/nowhere"

const AUTHORED = "one/two/held.module.ts"

const UNCOMMITTED = "one/two/held.seat.entries.uncommitted.jsonl"

function changeOf(paths: readonly string[], root: string = NOWHERE): Change {
  return { root, changed: paths, before: () => null, after: () => BYTES }
}

test("a folder a file opens is answered under the folder above that folder", () => {
  const grouped = groupedOver(changeOf([AUTHORED]))

  expect(grouped.foldersIn("")).toEqual(["one"])
  expect(grouped.foldersIn("one")).toEqual(["one/two"])
})

test("a folder holding only uncommitted files is no folder here", () => {
  const grouped = groupedOver(changeOf([UNCOMMITTED]))

  expect(grouped.foldersIn("")).toEqual([])
  expect(grouped.foldersIn("one")).toEqual([])
})

test("an uncommitted file beside an authored one leaves that folder answered", () => {
  const grouped = groupedOver(changeOf([AUTHORED, UNCOMMITTED]))

  expect(grouped.foldersIn("one")).toEqual(["one/two"])
})

test("a folder a change leaves holding no file and no folder is no folder here", () => {
  const root = scratch.rootFor("akasha-folder-grouping-")
  mkdirSync(join(root, "one", "two"), { recursive: true })
  const grouped = groupedOver(changeOf([], root))

  expect(holdsNothing(grouped, "one/two")).toBe(true)
  expect(grouped.foldersIn("one")).toEqual([])
})

test("a folder holding a folder that holds a file is a folder here", () => {
  const grouped = groupedOver(changeOf([AUTHORED]))

  expect(holdsNothing(grouped, "one")).toBe(false)
  expect(holdsNothing(grouped, "one/two")).toBe(false)
})

test("an uncommitted file is still among the files of the folder it sits in", () => {
  const grouped = groupedOver(changeOf([UNCOMMITTED]))

  expect(grouped.at("one/two")).toEqual([UNCOMMITTED])
})
