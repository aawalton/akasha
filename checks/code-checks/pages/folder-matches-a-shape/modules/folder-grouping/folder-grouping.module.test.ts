import { expect, test } from "bun:test"
import { groupedOver } from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import type { Answering } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
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

test("an uncommitted file is still among the files of the folder it sits in", () => {
  const grouped = groupedOver(INDEX, changeOf([UNCOMMITTED]))

  expect(grouped.at("one/two")).toEqual([UNCOMMITTED])
})
