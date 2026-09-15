import { expect, test } from "bun:test"
import {
  foldersHere,
  foldersIn,
  type Held,
  heldIn,
} from "akasha/page/service/modules/pages-foldered/pages-foldered.module.code.ts"

function held(name: string, folder: boolean): Held {
  return { name, folder }
}

test("a folder holding a page file of that type holds its pages as files", () => {
  expect(foldersIn([held("one.shard.ts", false), held("two", true)], "shard")).toBe(false)
})

test("a folder holding a subfolder and no such page file holds its pages in folders", () => {
  expect(foldersIn([held("one", true), held("two", true)], "shard")).toBe(true)
})

test("a folder holding neither is answered as holding its pages as files", () => {
  expect(foldersIn([], "shard")).toBe(false)
  expect(foldersIn([held("notes.md", false)], "shard")).toBe(false)
})

test("a page file of another page type shapes nothing here", () => {
  expect(foldersIn([held("one.crate.ts", false), held("two", true)], "shard")).toBe(true)
})

test("a folder that is not there is read as holding nothing", () => {
  expect(heldIn("/var/tmp", "nowhere-at-all-under-here")).toEqual([])
  expect(foldersHere("/var/tmp", "nowhere-at-all-under-here", "shard")).toBe(false)
})
