import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  groupedOver,
  holdsNothing,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

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

const WHO: readonly string[] = [
  "-c",
  "user.email=folder-grouping@akasha",
  "-c",
  "user.name=folder-grouping",
  "-c",
  "commit.gpgsign=false",
]

function landedOn(): Change {
  const root = scratch.rootFor("akasha-folder-grouping-landed-")
  mkdirSync(join(root, "one"), { recursive: true })
  writeFileSync(join(root, "one", "a.module.ts"), "\n")
  said(root, ["init", "--quiet"])
  said(root, ["add", "--all"])
  said(root, [...WHO, "commit", "--quiet", "-m", "the commit this change is judged against"])
  const base = said(root, ["rev-parse", "HEAD"]).trim()
  mkdirSync(join(root, "one", "later"), { recursive: true })
  writeFileSync(join(root, "one", "later", "b.module.ts"), "\n")
  said(root, ["add", "--all"])
  said(root, [...WHO, "commit", "--quiet", "-m", "another landing"])
  return { ...changeOf([], root), base }
}

test("a folder another landing added after the base commit is no folder here", () => {
  const grouped = groupedOver(landedOn())

  expect(grouped.at("one/later")).toEqual([])
  expect(grouped.foldersIn("one")).toEqual([])
})

test("what the base commit already carried is a folder here still", () => {
  const grouped = groupedOver(landedOn())

  expect(grouped.at("one")).toEqual(["one/a.module.ts"])
})
