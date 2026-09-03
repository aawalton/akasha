import { describe, expect, test } from "bun:test"
import { type Row, rowOf } from "../exercise-rows/exercise-rows.module.code.ts"
import { focusesIn, focusIn } from "./schedule-focus.module.code.ts"

const DAYS: readonly Row[] = [
  rowOf({ id: "1", slug: "ppl-monday", dayOfWeek: "monday", focus: "push" }),
  rowOf({ id: "2", slug: "ppl-tuesday", dayOfWeek: "tuesday", focus: "pull" }),
  rowOf({ id: "3", slug: "ppl-wednesday", dayOfWeek: "wednesday", focus: "legs" }),
  rowOf({ id: "4", slug: "ppl-thursday", dayOfWeek: "thursday", focus: "push" }),
  rowOf({ id: "5", slug: "ppl-sunday", dayOfWeek: "sunday", focus: "rest" }),
]

describe("what a rotation trains", () => {
  test("the fixture holds five days over three focuses and a rest, so an empty one cannot read clean", () => {
    expect(DAYS.length).toBe(5)
  })

  test("a day taking a focus names it", () => {
    const [monday] = DAYS
    expect(monday).toBeDefined()
    expect(focusIn(monday as Row)).toBe("push")
  })

  test("a day taking rest names no focus", () => {
    const sunday = DAYS[4]
    expect(sunday).toBeDefined()
    expect(focusIn(sunday as Row)).toBeNull()
  })

  test("a day that does not stand names no focus", () => {
    expect(focusIn(null)).toBeNull()
  })

  test("a day stating no focus at all names none rather than naming an empty one", () => {
    expect(focusIn(rowOf({ id: "6", slug: "bare" }))).toBeNull()
  })

  test("a focus carried by two days is counted once, and rest is not a focus", () => {
    expect(focusesIn(DAYS)).toEqual(["push", "pull", "legs"])
  })

  test("a rotation of nothing but rest trains no focus", () => {
    expect(focusesIn([rowOf({ id: "7", slug: "r", focus: "rest" })])).toEqual([])
  })
})
