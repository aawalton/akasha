import { expect, test } from "bun:test"
import {
  capacityHoursOf,
  capacityIn,
  costFor,
  recoveryFor,
} from "akasha/alan/harness/readouts/pages/upkeep-capacity/upkeep-capacity.readout.code.ts"

const held = (capacity: unknown) => ({ values: { "health-capacity-hours": capacity } })

const stretch = (over: Readonly<Record<string, unknown>>) => ({
  title: "Projects",
  "start-time": "2026-09-07T13:00:00.000Z",
  "end-time": "2026-09-07T14:00:00.000Z",
  "safety-level": "3",
  "difficulty-level": "3",
  ...over,
})

test("a stretch still running carries no capacity rather than its hours so far", () => {
  expect(capacityHoursOf(stretch({ "end-time": undefined }))).toBeNull()
  expect(capacityHoursOf(stretch({ "end-time": "" }))).toBeNull()
})

test("a stretch is worth the hours it ran times what an hour of it was worth", () => {
  expect(capacityHoursOf(stretch({ title: "Pod", "difficulty-level": "2" }))).toBe(3)
  expect(
    capacityHoursOf(
      stretch({
        "end-time": "2026-09-07T15:00:00.000Z",
        title: "Bath",
        "difficulty-level": "2",
      })
    )
  ).toBe(6)
})

test("a stretch whose times will not be read carries no capacity", () => {
  expect(capacityHoursOf(stretch({ "start-time": "soon" }))).toBeNull()
})

test("a title gives capacity back only where it names a rest as a word of its own", () => {
  expect(recoveryFor("Projects + Pod")).toBe(3)
  expect(recoveryFor("Bath")).toBe(3)
  expect(recoveryFor("Breathing")).toBe(1)
  expect(recoveryFor("Podcast")).toBe(0)
  expect(recoveryFor(undefined)).toBe(0)
})

test("a stretch costs capacity by how far its difficulty ran past its safety", () => {
  expect(costFor("3", "2")).toBe(0)
  expect(costFor("3", "3")).toBe(1)
  expect(costFor("3", "3.5")).toBe(1.5)
  expect(costFor("3", "7.5")).toBe(24)
  expect(costFor("3", "8")).toBe(32)
})

test("a stretch stating no safety or no difficulty costs nothing", () => {
  expect(costFor(undefined, "5")).toBe(0)
  expect(costFor("3", "")).toBe(0)
})

test("a capacity given as text is read as the number it spells", () => {
  expect(capacityIn([held("1.5")])).toBe(1.5)
  expect(capacityIn([held("-3.25")])).toBe(-3.25)
  expect(capacityIn([held(-2)])).toBe(-2)
})

test("the reading is what every stretch of the day adds up to", () => {
  expect(capacityIn([held(1.5), held("2"), held(-0.5)])).toBe(3)
})

test("a stretch carrying no capacity is left out of the sum", () => {
  expect(capacityIn([held(2), held(undefined), held(""), held("   "), held(null)])).toBe(2)
  expect(capacityIn([held(2), held("soon")])).toBe(2)
})

test("a capacity of zero is a reading rather than an absent one", () => {
  expect(capacityIn([held("0")])).toBe(0)
  expect(capacityIn([held(1), held(-1)])).toBe(0)
})

test("no stretch on the day is no reading rather than a capacity of zero", () => {
  expect(capacityIn([])).toBeNull()
})

test("a day whose every stretch carries no capacity is no reading", () => {
  expect(capacityIn([held(undefined), held(null), held("")])).toBeNull()
})
