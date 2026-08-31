import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { mergeUncommitted } from "../../pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import { keepReading, readingAged, readingKept } from "./readout-reading.module.code.ts"

const PAGE = "akasha/readout-system/readout/readouts/backlog/backlog.readout.ts"

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
