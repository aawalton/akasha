import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  groupedOver,
  holdsNothing,
  listingOf,
  wantedOver,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const BYTES = new Uint8Array()

const AUTHORED = "one/two/held.module.ts"

const UNCOMMITTED = "one/two/held.seat.entries.uncommitted.jsonl"

test("a folder a file opens is answered under the folder above that folder", () => {
  const grouped = groupedOver(listingOf([AUTHORED]))

  expect(grouped.foldersIn("")).toEqual(["one"])
  expect(grouped.foldersIn("one")).toEqual(["one/two"])
})

test("a folder holding only uncommitted files is no folder here", () => {
  const grouped = groupedOver(listingOf([UNCOMMITTED]))

  expect(grouped.foldersIn("")).toEqual([])
  expect(grouped.foldersIn("one")).toEqual([])
})

test("an uncommitted file beside an authored one leaves that folder answered", () => {
  const grouped = groupedOver(listingOf([AUTHORED, UNCOMMITTED]))

  expect(grouped.foldersIn("one")).toEqual(["one/two"])
})

test("a folder a file opens holds something, and so does every folder above it", () => {
  const grouped = groupedOver(listingOf([AUTHORED]))

  expect(holdsNothing(grouped, "one")).toBe(false)
  expect(holdsNothing(grouped, "one/two")).toBe(false)
})

test("an uncommitted file is still among the files of the folder it sits in", () => {
  const grouped = groupedOver(listingOf([UNCOMMITTED]))

  expect(grouped.at("one/two")).toEqual([UNCOMMITTED])
})

test("a file a generator writes sits in no folder here", () => {
  const grouped = groupedOver(listingOf([AUTHORED]), (path) => path === AUTHORED)

  expect(grouped.at("one/two")).toEqual([])
  expect(grouped.foldersIn("one")).toEqual([])
})

const BESIDE = "one/two/zed.module.ts"

const ABOVE = "one/above.module.ts"

test("a folder is answered with the files sitting in it the caller wants, in the order they sit", () => {
  const grouped = groupedOver(listingOf([AUTHORED, BESIDE, UNCOMMITTED]))
  const wanted = wantedOver(grouped, (one) => one !== UNCOMMITTED)

  expect(wanted("one/two")).toEqual([AUTHORED, BESIDE])
})

test("a folder asked a second time is answered without asking of its files again", () => {
  const grouped = groupedOver(listingOf([AUTHORED, BESIDE, UNCOMMITTED]))
  const asked: string[] = []
  const wanted = wantedOver(grouped, (one) => {
    asked.push(one)
    return one !== UNCOMMITTED
  })

  expect(wanted("one/two")).toEqual([AUTHORED, BESIDE])
  expect(wanted("one/two")).toEqual([AUTHORED, BESIDE])
  expect(asked).toEqual([AUTHORED, UNCOMMITTED, BESIDE])
})

test("each folder is answered with its own files rather than another folder's", () => {
  const grouped = groupedOver(listingOf([AUTHORED, ABOVE]))
  const wanted = wantedOver(grouped, () => true)

  expect(wanted("one")).toEqual([ABOVE])
  expect(wanted("one/two")).toEqual([AUTHORED])
})

const HELD = "one/a.module.ts"

const WRITTEN = "one/later/b.module.ts"

function checkoutHolding(): string {
  const root = scratch.rootFor("akasha-folder-grouping-")
  mkdirSync(join(root, "one"), { recursive: true })
  writeFileSync(join(root, HELD), "\n")
  return root
}

function changeOver(root: string, written: readonly string[], gone: readonly string[]): Change {
  return {
    root,
    changed: [...written, ...gone],
    before: () => null,
    after: (path) => (written.includes(path) ? BYTES : null),
  }
}

test("a file the change writes sits in its folder, and that folder is opened", () => {
  const root = checkoutHolding()
  const grouped = groupedOver(shadowAsked(changeOver(root, [WRITTEN], [])))

  expect(grouped.at("one/later")).toEqual([WRITTEN])
  expect(grouped.foldersIn("one")).toEqual(["one/later"])
  expect(grouped.at("one")).toEqual([HELD])
})

test("a file the change takes away is gone, and a folder left holding nothing is no folder", () => {
  const root = checkoutHolding()
  const grouped = groupedOver(shadowAsked(changeOver(root, [], [HELD])))

  expect(grouped.at("one")).toEqual([])
  expect(holdsNothing(grouped, "one")).toBe(true)
  expect(grouped.foldersIn("")).toEqual([])
})
