import { expect, test } from "bun:test"
import type { Asking } from "../../../readout-asking/readout-asking.module.code.ts"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  fetchSafetyLevel,
  fetchSafetyLevelOnDay,
  levelIn,
  levelOn,
  OPEN_SESSION,
} from "./upkeep-safety.readout.code.ts"

const YESTERDAY = "day-2026-09-01"

const TODAY = "day-2026-09-02"

type Block = { readonly day: string; readonly at: string; readonly level: string | null }

const TWO_DAYS: readonly Block[] = [
  { day: YESTERDAY, at: "2026-09-01T14:00:00.000Z", level: "1" },
  { day: YESTERDAY, at: "2026-09-01T22:00:00.000Z", level: "1.5" },
  { day: TODAY, at: "2026-09-02T15:00:00.000Z", level: "3" },
]

type Asked = {
  readonly where?: Readonly<Record<string, { readonly is?: string; readonly empty?: boolean }>>
  readonly "sort-by"?: string
  readonly descending?: boolean
  readonly limit?: number
}

function storeOf(blocks: readonly Block[]): Asking {
  return async (query) => {
    const asked = query as Asked
    const where = asked.where ?? {}
    let kept = [...blocks]
    const named = where["daily-tracking"]?.is
    if (named !== undefined) kept = kept.filter((one) => one.day === named)
    if (where["safety-level"]?.empty === false) kept = kept.filter((one) => one.level !== null)
    if (asked["sort-by"] === "start-time") {
      kept.sort((one, next) => (one.at < next.at ? -1 : one.at > next.at ? 1 : 0))
      if (asked.descending === true) kept.reverse()
    }
    if (asked.limit !== undefined) kept = kept.slice(0, asked.limit)
    return {
      ok: true,
      rows: kept.map((one) => ({
        values: { "safety-level": one.level, "start-time": one.at, "daily-tracking": one.day },
      })),
    }
  }
}

test("the blocks asked for are the day's own carrying a level, latest first", () => {
  const asked = levelOn(YESTERDAY) as Asked & { readonly "page-type"?: string }
  expect(asked["page-type"]).toBe("session-tracking")
  expect(asked.where).toEqual({
    "daily-tracking": { is: YESTERDAY },
    "safety-level": { empty: false },
  })
  expect(asked["sort-by"]).toBe("start-time")
  expect(asked.descending).toBe(true)
  expect(asked.limit).toBe(1)
})

test("the level asked for a day is that day's own rather than the next day's", async () => {
  const store = storeOf(TWO_DAYS)
  expect(await fetchSafetyLevelOnDay(store, YESTERDAY)).toBe(1.5)
  expect(await fetchSafetyLevelOnDay(store, TODAY)).toBe(3)
})

test("the level a day carries is the last of that day rather than the first", async () => {
  expect(await fetchSafetyLevelOnDay(storeOf(TWO_DAYS), YESTERDAY)).toBe(1.5)
})

test("a block carrying no level is passed over rather than read as the day's level", async () => {
  const blocks: readonly Block[] = [
    { day: YESTERDAY, at: "2026-09-01T14:00:00.000Z", level: "2" },
    { day: YESTERDAY, at: "2026-09-01T22:00:00.000Z", level: null },
  ]
  expect(await fetchSafetyLevelOnDay(storeOf(blocks), YESTERDAY)).toBe(2)
})

test("a day no block carries a level on is no reading rather than a level of zero", async () => {
  const blocks: readonly Block[] = [{ day: YESTERDAY, at: "2026-09-01T14:00:00.000Z", level: null }]
  expect(await fetchSafetyLevelOnDay(storeOf(blocks), YESTERDAY)).toBeNull()
  expect(await fetchSafetyLevelOnDay(storeOf(blocks), TODAY)).toBeNull()
})

test("a store that refuses the day is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchSafetyLevelOnDay(refusing("the index holds no such page type"), YESTERDAY)
  ).rejects.toThrow("unknown rather than nothing")
})

test("the session asked for is the one that has not ended, latest first", () => {
  expect(OPEN_SESSION["page-type"]).toBe("session-tracking")
  expect(OPEN_SESSION.where).toEqual({ "end-time": { empty: true } })
  expect(OPEN_SESSION["sort-by"]).toBe("start-time")
  expect(OPEN_SESSION.descending).toBe(true)
  expect(OPEN_SESSION.limit).toBe(1)
})

test("a level stated as text is read as the number that level spells", () => {
  expect(levelIn({ "safety-level": "3" })).toBe(3)
  expect(levelIn({ "safety-level": "2.5" })).toBe(2.5)
  expect(levelIn({ "safety-level": "-1.5" })).toBe(-1.5)
  expect(levelIn({ "safety-level": -2 })).toBe(-2)
})

test("a level of zero is a level rather than an absent one", () => {
  expect(levelIn({ "safety-level": "0" })).toBe(0)
})

test("a session carrying no level is no reading rather than a level of zero", () => {
  expect(levelIn({})).toBeNull()
  expect(levelIn({ "safety-level": "" })).toBeNull()
  expect(levelIn({ "safety-level": "   " })).toBeNull()
  expect(levelIn({ "safety-level": "soon" })).toBeNull()
  expect(levelIn({ "safety-level": null })).toBeNull()
})

test("no open session is no reading rather than a level of zero", async () => {
  expect(await fetchSafetyLevel(answering([]))).toBeNull()
})

test("the level of the open session is the reading", async () => {
  expect(await fetchSafetyLevel(answering([{ values: { "safety-level": "2.5" } }]))).toBe(2.5)
})

test("an open session carrying no level is no reading", async () => {
  expect(await fetchSafetyLevel(answering([{ values: { title: "a block" } }]))).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchSafetyLevel(refusing("the index holds no such page type"))).rejects.toThrow(
    "unknown rather than nothing"
  )
})
