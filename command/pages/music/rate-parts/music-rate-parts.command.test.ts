import { expect, test } from "bun:test"
import {
  amissIn,
  type Counted,
  chosenAmong,
  gradedPart,
  messageOf,
  namingOf,
  type Part,
  rowsOf,
  sharedIn,
} from "akasha/command/pages/music/rate-parts/music-rate-parts.command.code.ts"

const TRACK = "track"

const ONE = ["release/one"]

const TWO = ["release/one", "release/two"]

function partOf(slug: string, held: Record<string, unknown> = {}): Part {
  const value = { slug, partOfCollections: ONE, ...held }
  return { pageTypeSlug: TRACK, slug, value, shared: sharedIn(value) }
}

const COUNTS: Counted = { parts: 4, grading: 3, already: 1, shared: 2 }

test("a part one collection holds is not shared", () => {
  expect(sharedIn({ partOfCollections: ONE })).toBe(false)
})

test("a part more than one collection holds is shared", () => {
  expect(sharedIn({ partOfCollections: TWO })).toBe(true)
})

test("a part naming no collection is not shared", () => {
  expect(sharedIn({})).toBe(false)
})

test("a part a second release also carries is named as shared", () => {
  expect(namingOf(partOf("two", { partOfCollections: TWO }))).toBe(`grade\t${TRACK}/two\tshared`)
})

test("a part one release carries is named without that word", () => {
  expect(namingOf(partOf("one"))).toBe(`grade\t${TRACK}/one`)
})

test("a part already carrying a grade is left as that part is", () => {
  const chosen = chosenAmong([partOf("one", { grade: "A" })], false)
  expect(chosen.counts).toEqual({ parts: 1, grading: 0, already: 1, shared: 0 })
  expect(chosen.taking).toEqual([])
  expect(chosen.naming).toEqual([])
})

test("a run told to regrade writes over a grade already carried", () => {
  const chosen = chosenAmong([partOf("one", { grade: "A" })], true)
  expect(chosen.counts).toEqual({ parts: 1, grading: 1, already: 0, shared: 0 })
  expect(chosen.naming).toEqual([`grade\t${TRACK}/one`])
})

test("a part carrying no grade is graded, and a shared one is counted as shared", () => {
  const chosen = chosenAmong([partOf("one"), partOf("two", { partOfCollections: TWO })], false)
  expect(chosen.counts).toEqual({ parts: 2, grading: 2, already: 0, shared: 1 })
})

test("a part left for the grade it carries is counted nowhere but under `already`", () => {
  const one = partOf("two", { grade: "A", partOfCollections: TWO })
  expect(chosenAmong([one], false).counts).toEqual({
    parts: 1,
    grading: 0,
    already: 1,
    shared: 0,
  })
})

test("a collection holding no part answers zeros and takes nothing", () => {
  const chosen = chosenAmong([], false)
  expect(chosen.counts).toEqual({ parts: 0, grading: 0, already: 0, shared: 0 })
  expect(chosen.taking).toEqual([])
})

test("the counts are said as rows a reader takes", () => {
  expect(rowsOf(COUNTS)).toEqual(["parts\t4", "grading\t3", "already\t1", "shared\t2"])
})

test("what the landing is told names the collection, the count and the grade", () => {
  expect(messageOf(COUNTS, "release/wicked", "C")).toBe("grade 3 part(s) of release/wicked as C")
})

test("a song reached under the page named is no part to grade", () => {
  expect(gradedPart("song")).toBe(false)
  expect(gradedPart(TRACK)).toBe(true)
  expect(gradedPart("release")).toBe(true)
})

test("a target that is no sort of music page is refused", () => {
  const said = amissIn("album", "C")
  expect(said).toContain("`album`")
  expect(said).toContain("`release`")
})

test("a grade off the ladder is refused", () => {
  expect(amissIn("release", "A++")).toContain("`A++`")
})

test("a target and a grade the ladder holds are taken", () => {
  expect(amissIn("release", "C")).toBe(null)
})
