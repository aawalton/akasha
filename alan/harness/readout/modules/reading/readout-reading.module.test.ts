import { afterAll, expect, test } from "bun:test"
import {
  keepReading,
  readingKept,
  readingOn,
  readingValues,
  readoutServedBy,
  readoutsServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const PAGE = "alan/harness/readout/pages/upkeep-probe/upkeep-probe.readout.ts"

const OTHER = "alan/harness/readout/pages/upkeep-other/upkeep-other.readout.ts"

const READOUT = "readout"

const PROBE_SLUG = "upkeep-probe"

const PROBE_ID = "01a057f9-873e-7390-9635-32012c10d150"

const TAKEN = "2026-08-31T12:00:00.000Z"

const made = scratchWorld()

const BODY = `export const it = { type: "${pageType.slug}/${readout.slug}" }\n`

const SCRATCH = {
  rootFor: (name: string): string => {
    const root = made.rootFor(name)
    writing(root, PAGE, BODY)
    writing(root, OTHER, BODY)
    return root
  },
  sweep: made.sweep,
}

afterAll(() => SCRATCH.sweep())

test("a readout with nothing beside it has taken no reading", () => {
  expect(readingKept(SCRATCH.rootFor("readout-reading-"), PAGE)).toBeNull()
})

test("a reading kept is the reading read back", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  expect(readingKept(root, PAGE)).toEqual({ value: 19, at: TAKEN, fallsPerHour: 0 })
})

test("a reading replaces the one before it rather than sitting beside it", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  keepReading(root, PAGE, 4, new Date("2026-08-31T12:05:00.000Z"))
  expect(readingKept(root, PAGE)).toEqual({
    value: 4,
    at: "2026-08-31T12:05:00.000Z",
    fallsPerHour: 0,
  })
})

test("a reading falling with the clock is read back at the rate it was kept at", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN), 2)
  expect(readingKept(root, PAGE)).toEqual({ value: 19, at: TAKEN, fallsPerHour: 2 })
})

test("a take naming no rate leaves the rate the take before it wrote", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN), 2)
  keepReading(root, PAGE, 19, new Date(TAKEN))
  expect(readingKept(root, PAGE)?.fallsPerHour).toBe(2)
})

test("a take naming a rate of nothing writes that rather than leaving the rate before it", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN), 2)
  keepReading(root, PAGE, 19, new Date(TAKEN), 0)
  expect(readingKept(root, PAGE)?.fallsPerHour).toBe(0)
})

test("a reading of nothing is a reading rather than an absent one", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 0, new Date(TAKEN))
  expect(readingKept(root, PAGE)?.value).toBe(0)
})

test("a reading carrying only one of its halves is refused rather than read as none", () => {
  const root = SCRATCH.rootFor("readout-reading-")
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

test("the keys a reading is written under are answered rather than spelled by the writer", () => {
  expect(readingValues({ value: 19, at: TAKEN })).toEqual({ lastValue: 19, lastValueAt: TAKEN })
})

test("a rate given is written beside the two halves and a rate not given is left out", () => {
  expect(readingValues({ value: 19, at: TAKEN, fallsPerHour: 2 })).toEqual({
    lastValue: 19,
    lastValueAt: TAKEN,
    lastValueFallsPerHour: 2,
  })
  expect(readingValues({ value: 19, at: TAKEN, fallsPerHour: 0 })).toEqual({
    lastValue: 19,
    lastValueAt: TAKEN,
    lastValueFallsPerHour: 0,
  })
})

test("a reading written under those keys reads back as the reading it was", () => {
  expect(readingOn(readingValues({ value: 19, at: TAKEN, fallsPerHour: 2 }))).toEqual({
    value: 19,
    at: TAKEN,
    fallsPerHour: 2,
  })
})

const TAKER = "module/probe-reading"

const ELSEWHERE = "module/other-reading"

function servedBody(servedBy: readonly string[]): string {
  const type = `${pageType.slug}/${readout.slug}`
  return `export const it = { type: "${type}", servedBy: ${JSON.stringify(servedBy)} }\n`
}

function servedWorld(named: Readonly<Record<string, readonly string[]>>): string {
  const root = SCRATCH.rootFor("readout-served-")
  nothingFiled(root)
  Object.entries(named).forEach(([path, servedBy], at) => {
    writing(root, path, servedBody(servedBy))
    const slug = path.split("/").at(-2) ?? ""
    listedFiled(root, READOUT, slug, [{ path, id: `${PROBE_ID.slice(0, -1)}${at}` }])
  })
  return root
}

test("every readout naming what serves it is found, and no other", () => {
  const root = servedWorld({ [PAGE]: [TAKER], [OTHER]: [TAKER, ELSEWHERE] })
  expect(readoutsServedBy(root, TAKER).map((one) => one.path)).toEqual([PAGE, OTHER].sort())
  expect(readoutsServedBy(root, ELSEWHERE).map((one) => one.path)).toEqual([OTHER])
})

test("what no readout names as serving it finds none", () => {
  const root = servedWorld({ [PAGE]: [ELSEWHERE] })
  expect(readoutsServedBy(root, TAKER)).toEqual([])
})

test("the one readout naming what serves it is found by its page", () => {
  const root = servedWorld({ [PAGE]: [TAKER], [OTHER]: [ELSEWHERE] })
  expect(readoutServedBy(root, TAKER)).toBe(PAGE)
})

test("one readout asked of what no readout names is refused rather than answered", () => {
  const root = servedWorld({ [PAGE]: [ELSEWHERE] })
  expect(() => readoutServedBy(root, TAKER)).toThrow()
})

test("one readout asked of what two readouts name is refused rather than answered", () => {
  const root = servedWorld({ [PAGE]: [TAKER], [OTHER]: [TAKER] })
  expect(() => readoutServedBy(root, TAKER)).toThrow()
})

test("a readout is found with the values its page states", () => {
  const root = servedWorld({ [PAGE]: [TAKER] })
  expect(readoutsServedBy(root, TAKER)[0]?.value.servedBy).toEqual([TAKER])
})

test("a readout answering nothing keeps the reading it last took", () => {
  const root = SCRATCH.rootFor("readout-reading-")
  keepReading(root, PAGE, 19, new Date(TAKEN))
  expect(uncommittedIn(root, PAGE)).toEqual({ lastValue: 19, lastValueAt: TAKEN })
})
