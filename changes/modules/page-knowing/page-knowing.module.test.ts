import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_PAGE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../shadow/change-shadow.module.code.ts"
import { namersIn, pageIn, readFor, singleIn, targetsIn } from "./page-knowing.module.code.ts"

afterAll(scratch.sweep)

const MISSING = "akasha/one/missing.module.ts"

function worldIn(): World {
  const root = indexedRepo()
  return worldAt(root, textIn(root))
}

test("the page the index files at a path is answered", () => {
  expect(pageIn(worldIn(), HELD_PAGE)?.slug).toBe("held")
})

test("a path carrying a section beside the page's own names no page", () => {
  expect(pageIn(worldIn(), HELD_CODE)).toBeNull()
})

test("a path reading as no page file names no page", () => {
  expect(pageIn(worldIn(), "akasha/notes.md")).toBeNull()
})

test("a path the index files no page at names no page", () => {
  expect(pageIn(worldIn(), MISSING)).toBeNull()
})

test("a read answers the page standing at the path", () => {
  const read = readFor(worldIn(), HELD_PAGE)

  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.value.slug).toBe("held")
})

test("a path naming no page is refused rather than answered", () => {
  const read = readFor(worldIn(), MISSING)

  expect("refused" in read && read.refused).toContain("names no page")
})

test("a key naming a relation answers the page types that key reaches", () => {
  const read = readFor(worldIn(), NAMER_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(targetsIn(read.known, read.value, "note")).toEqual(["module"])
  expect(targetsIn(read.known, read.value, "partSlugs")).toEqual(["domain"])
})

test("a key reaching no property names no page", () => {
  const read = readFor(worldIn(), NAMER_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(targetsIn(read.known, read.value, "definition")).toEqual([])
})

test("the pages naming a path under one property are answered", () => {
  expect(namersIn(worldIn(), HELD_PAGE, "part-slugs")).toEqual([
    { path: NAMER_PAGE, propertySlug: "part-slugs" },
  ])
})

test("a property no page names the path under answers no page", () => {
  expect(namersIn(worldIn(), HELD_PAGE, "definition")).toEqual([])
})

test("a key the page's type holds one value under is single", () => {
  const world = worldIn()
  const read = readFor(world, HELD_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(singleIn(world, read.value, "code")).toBe(true)
})

test("a key the page's type names under no property holds many values", () => {
  const world = worldIn()
  const read = readFor(world, HELD_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(singleIn(world, read.value, "namedByNoProperty")).toBe(false)
})
