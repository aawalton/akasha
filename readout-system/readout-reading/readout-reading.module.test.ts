import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { mergeUncommitted } from "@akasha/pages-system/page-uncommitted"
import { keepReading, readingAged, readingKept, readingOn } from "./readout-reading.module.code.ts"

const PAGE = "akasha/readout-system/readouts/pages/upkeep-safety/upkeep-safety.readout.ts"

const TAKEN = "2026-08-31T12:00:00.000Z"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

test("a readout with nothing standing beside it has taken no reading", () => {
  expect(readingKept(scratch.rootFor("readout-reading-"), PAGE)).toBeNull()
})

test("a reading kept is the reading read back", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  expect(readingKept(root, PAGE)).toEqual({ value: 19, at: TAKEN })
})

test("a reading replaces the one before it rather than standing beside it", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  keepReading(root, PAGE, 4, new Date("2026-08-31T12:05:00.000Z"))
  expect(readingKept(root, PAGE)).toEqual({ value: 4, at: "2026-08-31T12:05:00.000Z" })
})

test("a reading of nothing is a reading rather than an absent one", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 0, new Date(TAKEN))
  expect(readingKept(root, PAGE)?.value).toBe(0)
})

test("a reading carrying only one of its halves is refused rather than read as none", () => {
  const root = scratch.rootFor("readout-reading-")
  mergeUncommitted(root, PAGE, { lastValue: 19 })
  expect(() => readingKept(root, PAGE)).toThrow()
})

test("how long ago a reading was taken is measured from the moment it carries", () => {
  expect(readingAged({ value: 19, at: TAKEN }, new Date("2026-08-31T12:01:00.000Z"))).toBe(60000)
})

test("a moment that cannot be read refuses rather than answering an age", () => {
  expect(() => readingAged({ value: 19, at: "never" }, new Date(TAKEN))).toThrow()
})

test("a reading is read back off the values a page carries", () => {
  expect(readingOn({ lastValue: 19, lastValueAt: TAKEN })).toEqual({ value: 19, at: TAKEN })
})

test("a reading of nothing on a row is a reading rather than an absence", () => {
  expect(readingOn({ lastValue: 0, lastValueAt: TAKEN })?.value).toBe(0)
})

test("values carrying neither half carry no reading", () => {
  expect(readingOn({ slug: "upkeep-safety" })).toBeNull()
})

test("values carrying one half alone carry no reading", () => {
  expect(readingOn({ lastValue: 19 })).toBeNull()
  expect(readingOn({ lastValueAt: TAKEN })).toBeNull()
})
