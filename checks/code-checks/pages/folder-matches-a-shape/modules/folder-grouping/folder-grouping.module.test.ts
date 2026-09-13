import { expect, test } from "bun:test"
import {
  groupedOver,
  holdsNothing,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import type { Answering } from "akasha/pages/indexes/modules/answering/index-answering.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"

const BYTES = new Uint8Array()

const NOWHERE = "/nowhere"

const INDEX = { filesIn: () => [], foldersIn: () => [] } as never as Answering

const AUTHORED = "one/two/held.module.ts"

const UNCOMMITTED = "one/two/held.seat.entries.uncommitted.jsonl"

function changeOf(paths: readonly string[]): Change {
  return { root: NOWHERE, changed: paths, before: () => null, after: () => BYTES }
}

test("a folder a file opens is answered under the folder above that folder", () => {
  const grouped = groupedOver(INDEX, changeOf([AUTHORED]))

  expect(grouped.foldersIn("")).toEqual(["one"])
  expect(grouped.foldersIn("one")).toEqual(["one/two"])
})

test("a folder holding only uncommitted files is no folder here", () => {
  const grouped = groupedOver(INDEX, changeOf([UNCOMMITTED]))

  expect(grouped.foldersIn("")).toEqual([])
  expect(grouped.foldersIn("one")).toEqual([])
})

test("an uncommitted file beside an authored one leaves that folder answered", () => {
  const grouped = groupedOver(INDEX, changeOf([AUTHORED, UNCOMMITTED]))

  expect(grouped.foldersIn("one")).toEqual(["one/two"])
})

test("a folder a change leaves holding no file and no folder is no folder here", () => {
  const grouped = groupedOver(
    {
      filesIn: () => [],
      foldersIn: (folder: string) => (folder === "one" ? ["one/two"] : []),
    } as never,
    changeOf([])
  )

  expect(holdsNothing(grouped, "one/two")).toBe(true)
  expect(grouped.foldersIn("one")).toEqual([])
})

test("a folder holding a folder that holds a file is a folder here", () => {
  const grouped = groupedOver(INDEX, changeOf([AUTHORED]))

  expect(holdsNothing(grouped, "one")).toBe(false)
  expect(holdsNothing(grouped, "one/two")).toBe(false)
})

test("an uncommitted file is still among the files of the folder it sits in", () => {
  const grouped = groupedOver(INDEX, changeOf([UNCOMMITTED]))

  expect(grouped.at("one/two")).toEqual([UNCOMMITTED])
})
