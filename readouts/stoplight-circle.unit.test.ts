import { describe, expect, test } from "bun:test"
import {
  type DescendingRung,
  descendingCircle,
  fixed,
} from "./stoplight-circle.ts"

const DAILY_INBOX_RUNGS: readonly DescendingRung[] = [
  { at: 100, color: "black" },
  { at: 10, color: "red" },
  { at: 1, color: "yellow" },
  { at: 0, color: "blue" },
]

const LIVE_COUNT_RUNGS: readonly DescendingRung[] = [
  { at: 4, color: "red" },
  { at: 2, color: "yellow" },
  { at: 1, color: "green" },
  { at: 0, color: "blue" },
]

describe("a figure rounds on its decimal value, half away from zero", () => {
  test("an exact half goes up, though its nearest double sits below it", () => {
    expect(fixed(4.35, 1)).toBe("4.4")
    expect(fixed(8.95, 1)).toBe("9.0")
    expect(fixed(1.325, 2)).toBe("1.33")
  })

  test("a negative exact half goes away from zero, not toward it", () => {
    expect(fixed(-4.35, 1)).toBe("-4.4")
    expect(fixed(-2.5, 0)).toBe("-3")
  })

  test("a positive half at no decimals goes up", () => {
    expect(fixed(2.5, 0)).toBe("3")
  })

  test("a figure below any half is left where it stands", () => {
    expect(fixed(4.34, 1)).toBe("4.3")
    expect(fixed(-4.34, 1)).toBe("-4.3")
  })
})

describe("descendingCircle — the stroke carries the current tier's colour", () => {
  test("nothing waiting is the best rung on the daily inbox scale", () => {
    expect(descendingCircle(0, DAILY_INBOX_RUNGS).tier).toBe("blue")
  })

  test("a reading inside a band takes that band's colour", () => {
    expect(descendingCircle(5, DAILY_INBOX_RUNGS).tier).toBe("yellow")
    expect(descendingCircle(50, DAILY_INBOX_RUNGS).tier).toBe("red")
  })

  test("a reading on a rung takes that rung, not the one below", () => {
    expect(descendingCircle(10, DAILY_INBOX_RUNGS).tier).toBe("red")
    expect(descendingCircle(1, DAILY_INBOX_RUNGS).tier).toBe("yellow")
  })
})

describe("descendingCircle — a reading past either end keeps its stroke", () => {
  test("past the worst rung there is no arc to draw", () => {
    const circle = descendingCircle(250, DAILY_INBOX_RUNGS)
    expect(circle.tier).toBe("black")
    expect(circle.nextTier).toBeNull()
    expect(circle.progress).toBeNull()
  })

  test("at the best rung there is nothing better to run toward", () => {
    const circle = descendingCircle(0, DAILY_INBOX_RUNGS)
    expect(circle.nextTier).toBeNull()
    expect(circle.progress).toBeNull()
  })

  test("a band only one reading wide is not between two rungs", () => {
    const circle = descendingCircle(1, LIVE_COUNT_RUNGS)
    expect(circle.tier).toBe("green")
    expect(circle.nextTier).toBeNull()
    expect(circle.progress).toBeNull()
  })
})

describe("descendingCircle — the arc carries the next tier's colour, skipping none", () => {
  test("yellow arcs to green though the scale's next rung is blue", () => {
    expect(descendingCircle(5, DAILY_INBOX_RUNGS).nextTier).toBe("green")
  })

  test("red arcs to yellow, the tier that actually follows it", () => {
    expect(descendingCircle(50, DAILY_INBOX_RUNGS).nextTier).toBe("yellow")
  })
})

describe("descendingCircle — the arc measures the band, never the whole scale", () => {
  test("the worst reading in a band has covered none of it", () => {
    expect(descendingCircle(9, DAILY_INBOX_RUNGS).progress).toBe(0)
    expect(descendingCircle(3, LIVE_COUNT_RUNGS).progress).toBe(0)
  })

  test("the yellow band spans the nine readings 1 to 9, so 5 has covered four of them", () => {
    expect(descendingCircle(5, DAILY_INBOX_RUNGS).progress).toBeCloseTo(4 / 9, 12)
  })

  test("the red band spans the ninety readings 10 to 99, so 50 has covered forty-nine", () => {
    expect(descendingCircle(50, DAILY_INBOX_RUNGS).progress).toBeCloseTo(49 / 90, 12)
  })

  test("the same reading sits differently on a narrower band", () => {
    expect(descendingCircle(2, LIVE_COUNT_RUNGS).progress).toBeCloseTo(1 / 2, 12)
  })
})

describe("descendingCircle — a scale with no rungs", () => {
  test("reads black with no arc rather than raising", () => {
    const circle = descendingCircle(3, [])
    expect(circle.tier).toBe("black")
    expect(circle.nextTier).toBeNull()
    expect(circle.progress).toBeNull()
  })
})
