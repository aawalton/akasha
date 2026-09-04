import { expect, test } from "bun:test"
import { heldIn } from "../file-name/page-file-name.module.code.ts"
import { partAt, partsOf, uncommittedPartAt } from "./page-file-parts.module.code.ts"

const PAGE_TYPES = new Set<string>(["temper-mine", "seat"])

const PROPERTIES = new Set<string>(["items", "quests", "patch", "uncommitted", "sops"])

const MINE = "akasha/one/eso.temper-mine.ts"

test("the first of a property's files is the name that property would carry alone", () => {
  expect(partAt(MINE, "items", "jsonl", 1)).toBe("akasha/one/eso.temper-mine.items.jsonl")
})

test("a property's file past the first carries a part, numbered from the second", () => {
  expect(partAt(MINE, "items", "jsonl", 2)).toBe("akasha/one/eso.temper-mine.items.part2.jsonl")
  expect(partAt(MINE, "items", "jsonl", 24)).toBe("akasha/one/eso.temper-mine.items.part24.jsonl")
})

test("a path that is no TypeScript file names no file beside it", () => {
  expect(partAt("akasha/one/notes.txt", "items", "jsonl", 2)).toBeNull()
  expect(partsOf("akasha/one/notes.txt", "items", "jsonl", () => true)).toEqual([])
})

test("what this puts together, heldIn takes apart again", () => {
  const at = partAt(MINE, "items", "jsonl", 7)
  if (at === null) throw new Error("expected a name beside the page")
  const held = heldIn(at, PAGE_TYPES, PROPERTIES)
  expect(held.kind).toBe("property")
  expect(held.propertySlug).toBe("items")
  expect(held.part).toBe(7)
  expect(held.page).toBe("eso.temper-mine")
})

test("a part of a property held uncommitted is taken apart again the same way", () => {
  const at = uncommittedPartAt("akasha/one/dalla.seat.ts", "patch", "patch", 3)
  expect(at).toBe("akasha/one/dalla.seat.patch.part3.uncommitted.patch")
  if (at === null) throw new Error("expected a name beside the page")
  const held = heldIn(at, PAGE_TYPES, PROPERTIES)
  expect(held.propertySlug).toBe("patch")
  expect(held.part).toBe(3)
  expect(held.uncommitted).toBe(true)
})

test("the files of one property are named in order from the first", () => {
  const there = new Set([
    "akasha/one/eso.temper-mine.items.part2.jsonl",
    "akasha/one/eso.temper-mine.items.part3.jsonl",
  ])
  expect(partsOf(MINE, "items", "jsonl", (at) => there.has(at))).toEqual([
    "akasha/one/eso.temper-mine.items.jsonl",
    "akasha/one/eso.temper-mine.items.part2.jsonl",
    "akasha/one/eso.temper-mine.items.part3.jsonl",
  ])
})

test("a property held in one file names that one file", () => {
  expect(partsOf(MINE, "quests", "jsonl", () => false)).toEqual([
    "akasha/one/eso.temper-mine.quests.jsonl",
  ])
})

test("naming stops where none is there, so a gap leaves what follows unnamed", () => {
  const there = new Set(["akasha/one/eso.temper-mine.items.part4.jsonl"])
  expect(partsOf(MINE, "items", "jsonl", (at) => there.has(at))).toEqual([
    "akasha/one/eso.temper-mine.items.jsonl",
  ])
})

test("a reserved section carries no part, so a part of one is a stray", () => {
  expect(heldIn("akasha/one/dalla.seat.uncommitted.part2.ts", PAGE_TYPES, PROPERTIES).kind).toBe(
    "stray"
  )
  expect(heldIn("akasha/one/dalla.seat.sops.part2.yaml", PAGE_TYPES, PROPERTIES).kind).toBe("stray")
})
