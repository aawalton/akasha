import { afterAll, expect, test } from "bun:test"
import {
  keepReading,
  keepSilence,
  readingKept,
  readingOn,
  readoutPage,
  WENT_SILENT_AT,
  wentSilentAtKept,
  wentSilentAtOn,
} from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  listedFiled,
  nothingFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

const PAGE = "alan/harness/readouts/pages/upkeep-probe/upkeep-probe.readout.ts"

const OTHER = "alan/harness/readouts/pages/upkeep-other/upkeep-other.readout.ts"

const READOUT = "readout"

const PROBE_SLUG = "upkeep-probe"

const PROBE_ID = "01a057f9-873e-7390-9635-32012c10d150"

const TAKEN = "2026-08-31T12:00:00.000Z"

const LATER = "2026-08-31T12:05:00.000Z"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

test("where a readout's page sits is asked of the index", () => {
  const root = scratch.rootFor("readout-page-")
  nothingFiled(root)
  listedFiled(root, READOUT, PROBE_SLUG, [{ path: PAGE, id: PROBE_ID }])

  expect(readoutPage(root, PROBE_SLUG)).toBe(PAGE)
})

test("a readout the index names no page for is refused rather than answered", () => {
  const root = scratch.rootFor("readout-page-")
  nothingFiled(root)

  expect(() => readoutPage(root, PROBE_SLUG)).toThrow()
})

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
  expect(readingOn({ slug: PROBE_SLUG })).toBeNull()
})

test("values carrying one half alone carry no reading", () => {
  expect(readingOn({ lastValue: 19 })).toBeNull()
  expect(readingOn({ lastValueAt: TAKEN })).toBeNull()
})

test("the key the moment of silence is carried under is named here alone", () => {
  expect(WENT_SILENT_AT).toBe("wentSilentAt")
  expect(wentSilentAtOn({ [WENT_SILENT_AT]: TAKEN })).toBe(TAKEN)
  expect(wentSilentAtOn({ [WENT_SILENT_AT]: 7 })).toBeNull()
  expect(wentSilentAtOn({})).toBeNull()
})

test("a readout that answered nothing carries when it began answering nothing", () => {
  const root = scratch.rootFor("readout-silence-")
  expect(keepSilence(root, [PAGE], new Set([PAGE]), new Date(TAKEN))).toEqual([PAGE])
  expect(wentSilentAtKept(root, PAGE)).toBe(TAKEN)
})

test("a readout that answered a number carries no such moment", () => {
  const root = scratch.rootFor("readout-silence-")
  expect(keepSilence(root, [PAGE], new Set(), new Date(TAKEN))).toEqual([])
  expect(wentSilentAtKept(root, PAGE)).toBeNull()
})

test("a readout answering nothing again leaves that moment where it already was", () => {
  const root = scratch.rootFor("readout-silence-")
  keepSilence(root, [PAGE], new Set([PAGE]), new Date(TAKEN))
  expect(keepSilence(root, [PAGE], new Set([PAGE]), new Date(LATER))).toEqual([])
  expect(wentSilentAtKept(root, PAGE)).toBe(TAKEN)
})

test("that moment is taken away by the take that answers a number again", () => {
  const root = scratch.rootFor("readout-silence-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  keepSilence(root, [PAGE], new Set([PAGE]), new Date(TAKEN))
  expect(keepSilence(root, [PAGE], new Set(), new Date(LATER))).toEqual([PAGE])
  expect(wentSilentAtKept(root, PAGE)).toBeNull()
  expect(readingKept(root, PAGE)?.value).toBe(19)
})

test("one readout answering nothing leaves the readouts beside it carrying nothing", () => {
  const root = scratch.rootFor("readout-silence-")
  keepSilence(root, [PAGE, OTHER], new Set([OTHER]), new Date(TAKEN))
  expect(wentSilentAtKept(root, PAGE)).toBeNull()
  expect(wentSilentAtKept(root, OTHER)).toBe(TAKEN)
})

test("the moment of silence sits beside the reading rather than replacing it", () => {
  const root = scratch.rootFor("readout-silence-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  keepSilence(root, [PAGE], new Set([PAGE]), new Date(LATER))
  expect(uncommittedIn(root, PAGE)).toEqual({
    lastValue: 19,
    lastValueAt: TAKEN,
    [WENT_SILENT_AT]: LATER,
  })
})
