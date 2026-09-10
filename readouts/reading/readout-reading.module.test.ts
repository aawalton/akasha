import { afterAll, expect, test } from "bun:test"
import { mergeUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { scratchWorld } from "../../commands/modules/scratching/scratching.module.code.ts"
import { keepReading, readingAged, readingKept, readingOn } from "./readout-reading.module.code.ts"

const PAGE = "readouts/pages/upkeep-safety/upkeep-safety.readout.ts"

const TAKEN = "2026-08-31T12:00:00.000Z"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

test("a readout with nothing beside it has taken no reading", () => {
  expect(readingKept(scratch.rootFor("readout-reading-"), PAGE)).toBeNull()
})

test("a reading kept is the reading read back", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  expect(readingKept(root, PAGE)).toEqual({ value: 19, at: TAKEN, fallsPerHour: 0 })
})

test("a reading replaces the one before it rather than sitting beside it", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  keepReading(root, PAGE, 4, new Date("2026-08-31T12:05:00.000Z"))
  expect(readingKept(root, PAGE)).toEqual({
    value: 4,
    at: "2026-08-31T12:05:00.000Z",
    fallsPerHour: 0,
  })
})

test("a reading falling with the clock is read back at the rate it was kept at", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN), 2)
  expect(readingKept(root, PAGE)).toEqual({ value: 19, at: TAKEN, fallsPerHour: 2 })
})

test("a take naming no rate leaves the rate the take before it wrote", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN), 2)
  keepReading(root, PAGE, 19, new Date(TAKEN))
  expect(readingKept(root, PAGE)?.fallsPerHour).toBe(2)
})

test("a take naming a rate of nothing writes that rather than leaving the rate before it", () => {
  const root = scratch.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN), 2)
  keepReading(root, PAGE, 19, new Date(TAKEN), 0)
  expect(readingKept(root, PAGE)?.fallsPerHour).toBe(0)
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
  const kept = { value: 19, at: TAKEN, fallsPerHour: 0 }
  expect(readingAged(kept, new Date("2026-08-31T12:01:00.000Z"))).toBe(60000)
})

test("a moment that cannot be read refuses rather than answering an age", () => {
  expect(() => readingAged({ value: 19, at: "never", fallsPerHour: 0 }, new Date(TAKEN))).toThrow()
})

test("a reading is read back off the values a page carries", () => {
  expect(readingOn({ lastValue: 19, lastValueAt: TAKEN })).toEqual({
    value: 19,
    at: TAKEN,
    fallsPerHour: 0,
  })
})

test("a rate on a row is read back with the reading that row carries", () => {
  expect(
    readingOn({ lastValue: 19, lastValueAt: TAKEN, lastValueFallsPerHour: 4 })?.fallsPerHour
  ).toBe(4)
})

test("a rate that is no finite number is read as falling at nothing an hour", () => {
  const values = { lastValue: 19, lastValueAt: TAKEN }
  expect(readingOn({ ...values, lastValueFallsPerHour: "2" })?.fallsPerHour).toBe(0)
  expect(readingOn({ ...values, lastValueFallsPerHour: Number.NaN })?.fallsPerHour).toBe(0)
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
