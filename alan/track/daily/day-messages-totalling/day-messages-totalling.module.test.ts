import { expect, test } from "bun:test"
import {
  type Dayed,
  daysCounted,
  daysOn,
  MESSAGES_COUNTED_FROM,
  sentOver,
} from "./day-messages-totalling.module.code.ts"

const DAYS: readonly Dayed[] = [
  { day: "2026-08-05", counted: [{ persona: "aura", sent: 400 }] },
  { day: "2026-09-08", counted: [{ persona: "aura", sent: 150 }] },
  {
    day: "2026-09-09",
    counted: [
      { persona: "aura", sent: 60 },
      { persona: "amy", sent: 30 },
    ],
  },
  { day: "2026-09-10", counted: [{ persona: "aura", sent: 999 }] },
]

test("counting begins on the day the counting began", () => {
  expect(MESSAGES_COUNTED_FROM).toBe("2026-08-08")
})

test("a day before the counting began is left out", () => {
  expect(daysCounted(DAYS, "2026-09-10").map((one) => one.day)).toEqual([
    "2026-09-08",
    "2026-09-09",
  ])
})

test("the day named is itself left out", () => {
  expect(daysCounted(DAYS, "2026-09-09").map((one) => one.day)).toEqual(["2026-09-08"])
})

test("one day alone is taken by its date", () => {
  expect(sentOver(daysOn(DAYS, "2026-09-09")).get("amy")).toBe(30)
})

test("one day alone is taken whether counting began by then or not", () => {
  expect(sentOver(daysOn(DAYS, "2026-08-05")).get("aura")).toBe(400)
})

test("a date no day carries is no day at all", () => {
  expect(daysOn(DAYS, "2026-09-06")).toEqual([])
})

test("a persona's messages are added up over the days counted", () => {
  expect(sentOver(daysCounted(DAYS, "2026-09-10")).get("aura")).toBe(210)
})

test("a persona counted on one day alone is added up all the same", () => {
  expect(sentOver(daysCounted(DAYS, "2026-09-10")).get("amy")).toBe(30)
})

test("a persona counted on no day is in no total rather than in a total of zero", () => {
  expect(sentOver(daysCounted(DAYS, "2026-09-10")).get("ione")).toBeUndefined()
})

test("no day counted is no total at all", () => {
  expect(sentOver([]).size).toBe(0)
})
