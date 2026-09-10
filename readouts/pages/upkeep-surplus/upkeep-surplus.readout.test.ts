import { expect, test } from "bun:test"
import { fallsPerHourIn, heldNothing, surplusIn } from "./upkeep-surplus.readout.code.ts"

const stretch = (safety: string, difficulty: string, endTime?: string) => ({
  startTime: "2026-08-31T12:00:00.000Z",
  safetyLevel: safety,
  difficultyLevel: difficulty,
  ...(endTime === undefined ? {} : { endTime }),
})

const held = (surplus: unknown, sleep: unknown = "8", spend: unknown = "8") => ({
  "surplus-hours": surplus,
  "sleep-hours": sleep,
  "spend-hours": spend,
})

test("a surplus given as text is read as the number it spells", () => {
  expect(surplusIn(held("1.5"))).toBe(1.5)
  expect(surplusIn(held("-3.25"))).toBe(-3.25)
  expect(surplusIn(held(-2))).toBe(-2)
})

test("a surplus of zero is a reading rather than an absent one", () => {
  expect(surplusIn(held("0"))).toBe(0)
  expect(surplusIn(held(0, "0", "0"))).toBe(0)
})

test("a day carrying no surplus is no reading rather than a surplus of zero", () => {
  expect(surplusIn(held(undefined))).toBeNull()
  expect(surplusIn(held(""))).toBeNull()
  expect(surplusIn(held("   "))).toBeNull()
  expect(surplusIn(held("soon"))).toBeNull()
  expect(surplusIn(held(null))).toBeNull()
})

test("a day holding neither sleep nor spend has held nothing to subtract", () => {
  expect(heldNothing({ "surplus-hours": "0" })).toBe(true)
  expect(heldNothing({ "surplus-hours": "0", "sleep-hours": null, "spend-hours": null })).toBe(true)
  expect(heldNothing({ "sleep-hours": "8" })).toBe(false)
  expect(heldNothing({ "spend-hours": "0" })).toBe(false)
})

test("the zero two absent halves subtract to is no reading rather than a surplus of zero", () => {
  expect(surplusIn({ "surplus-hours": "0", "sleep-hours": null, "spend-hours": null })).toBeNull()
  expect(surplusIn({ "surplus-hours": 0 })).toBeNull()
})

test("a day that spent everything it slept is a reading of zero rather than nothing", () => {
  expect(surplusIn({ "surplus-hours": "0", "sleep-hours": "8", "spend-hours": "8" })).toBe(0)
})

test("a row spelled as the day page spells it is no reading rather than the surplus it holds", () => {
  expect(surplusIn({ surplusHours: -5.5, sleepHours: 7.5, spendHours: 13 })).toBeNull()
  expect(surplusIn({ "surplus-hours": -5.5, "sleep-hours": 7.5, "spend-hours": 13 })).toBe(-5.5)
})

test("a day whose every stretch has ended has its surplus fall at nothing an hour", () => {
  const sessions = [
    stretch("4", "4", "2026-08-31T13:00:00.000Z"),
    stretch("3", "5", "2026-08-31T14:00:00.000Z"),
  ]
  expect(fallsPerHourIn({ sessions })).toBe(0)
})

test("a stretch running at its safety level has the surplus fall an hour an hour", () => {
  expect(fallsPerHourIn({ sessions: [stretch("4", "4")] })).toBe(1)
})

test("a stretch running a level inside its safety costs nothing, so nothing falls", () => {
  expect(fallsPerHourIn({ sessions: [stretch("4", "2")] })).toBe(0)
  expect(fallsPerHourIn({ sessions: [stretch("3", "2")] })).toBe(0)
})

test("a stretch running under its safety level has the surplus fall faster than the clock", () => {
  expect(fallsPerHourIn({ sessions: [stretch("3", "4")] })).toBe(2)
  expect(fallsPerHourIn({ sessions: [stretch("3", "5")] })).toBe(4)
  expect(fallsPerHourIn({ sessions: [stretch("2", "4.5")] })).toBe(6)
})

test("two stretches running at once fall at the two rates added up", () => {
  expect(fallsPerHourIn({ sessions: [stretch("4", "4"), stretch("3", "4")] })).toBe(3)
})

test("a stretch whose end is empty text is the stretch running now", () => {
  expect(fallsPerHourIn({ sessions: [stretch("4", "4", "")] })).toBe(1)
})

test("a stretch naming no safety or no difficulty costs nothing while it runs", () => {
  expect(fallsPerHourIn({ sessions: [{ startTime: "2026-08-31T12:00:00.000Z" }] })).toBe(0)
})

test("a day whose stretches cannot be read falls at nothing an hour", () => {
  expect(fallsPerHourIn({})).toBe(0)
  expect(fallsPerHourIn({ sessions: "jsonl" })).toBe(0)
  expect(fallsPerHourIn({ sessions: [null] })).toBe(0)
})
