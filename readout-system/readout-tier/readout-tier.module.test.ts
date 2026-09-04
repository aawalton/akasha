import { expect, test } from "bun:test"
import {
  climbs,
  falls,
  readingSaid,
  rungsIn,
  statedAt,
  tierAt,
} from "./readout-tier.module.code.ts"

const CLIMBING = rungsIn({ redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 })

const FALLING = rungsIn({ blackAt: 100, redAt: 10, yellowAt: 1, blueAt: 0 })

test("a rung stated as text is read as the number that rung spells", () => {
  expect(statedAt("2.5")).toBe(2.5)
  expect(statedAt(" -1.5 ")).toBe(-1.5)
  expect(statedAt(" 21 ")).toBe(21)
  expect(statedAt(11)).toBe(11)
  expect(statedAt(0)).toBe(0)
})

test("a rung stating nothing that is a number is no rung", () => {
  expect(statedAt("")).toBeNull()
  expect(statedAt("   ")).toBeNull()
  expect(statedAt("soon")).toBeNull()
  expect(statedAt(undefined)).toBeNull()
  expect(statedAt(null)).toBeNull()
  expect(statedAt(true)).toBeNull()
  expect(statedAt(Number.NaN)).toBeNull()
  expect(statedAt(Number.POSITIVE_INFINITY)).toBeNull()
})

test("the rungs are ordered from black through blue rather than by what they state", () => {
  expect(rungsIn({ blueAt: 4, redAt: 1, blackAt: 0 })).toEqual([
    { at: 0, color: "black" },
    { at: 1, color: "red" },
    { at: 4, color: "blue" },
  ])
})

test("a rung the scale states nothing for is left out", () => {
  expect(CLIMBING.map((rung) => rung.color)).toEqual(["red", "yellow", "green", "blue"])
})

test("a scale of fewer than two rungs says nothing about which way a reading runs", () => {
  expect(climbs(rungsIn({ redAt: 1 }))).toBe(false)
  expect(falls(rungsIn({ redAt: 1 }))).toBe(false)
  expect(tierAt(1, rungsIn({ redAt: 1 }))).toBeNull()
})

test("a scale climbs or falls and never both", () => {
  expect(climbs(CLIMBING)).toBe(true)
  expect(falls(CLIMBING)).toBe(false)
  expect(falls(FALLING)).toBe(true)
  expect(climbs(FALLING)).toBe(false)
})

test("a scale whose rungs neither climb nor fall is refused", () => {
  const neither = rungsIn({ redAt: 5, yellowAt: 5, greenAt: 9 })
  expect(climbs(neither)).toBe(false)
  expect(falls(neither)).toBe(false)
  expect(tierAt(7, neither)).toBeNull()
})

test("a reading reaches the highest rung whose number the reading has gone over", () => {
  expect(tierAt(1, CLIMBING)?.tier).toBe("red")
  expect(tierAt(2.5, CLIMBING)?.tier).toBe("yellow")
  expect(tierAt(3, CLIMBING)?.tier).toBe("green")
  expect(tierAt(9, CLIMBING)?.tier).toBe("blue")
})

test("a reading under every rung is black", () => {
  expect(tierAt(0.5, CLIMBING)?.tier).toBe("black")
  expect(tierAt(0, CLIMBING)?.tier).toBe("black")
  expect(tierAt(-2, CLIMBING)?.tier).toBe("black")
})

test("a rung the scale states nothing for is never named as the tier above", () => {
  expect(tierAt(1, CLIMBING)?.nextTier).toBe("yellow")
  expect(tierAt(0.5, CLIMBING)?.nextTier).toBe("red")
})

test("how far a reading has climbed is the fraction between the two rungs it sits on", () => {
  expect(tierAt(2.5, CLIMBING)?.progress).toBe(0.5)
  expect(tierAt(2, CLIMBING)?.progress).toBe(0)
})

test("a reading under every rung has climbed an unknown fraction rather than none", () => {
  expect(tierAt(0.5, CLIMBING)?.progress).toBeNull()
})

test("a reading on the highest rung has no tier above it", () => {
  expect(tierAt(4, CLIMBING)).toEqual({ tier: "blue", nextTier: null, progress: null })
})

test("a reading that is no finite number reaches no rung", () => {
  expect(tierAt(Number.NaN, CLIMBING)).toBeNull()
  expect(tierAt(Number.POSITIVE_INFINITY, CLIMBING)).toBeNull()
})

test("on a falling scale the rung reached is the first from black the reading has not gone under", () => {
  expect(tierAt(240, FALLING)?.tier).toBe("black")
  expect(tierAt(100, FALLING)?.tier).toBe("black")
  expect(tierAt(24, FALLING)?.tier).toBe("red")
  expect(tierAt(10, FALLING)?.tier).toBe("red")
  expect(tierAt(9, FALLING)?.tier).toBe("yellow")
  expect(tierAt(1, FALLING)?.tier).toBe("yellow")
  expect(tierAt(0, FALLING)?.tier).toBe("blue")
})

test("a reading under every rung of a falling scale is on the best rung the scale states", () => {
  expect(tierAt(-3, FALLING)).toEqual({ tier: "blue", nextTier: null, progress: null })
  expect(tierAt(0, FALLING)).toEqual({ tier: "blue", nextTier: null, progress: null })
})

test("the tier a falling reading is next to reach is the rung after the one reached", () => {
  expect(tierAt(240, FALLING)?.nextTier).toBe("red")
  expect(tierAt(24, FALLING)?.nextTier).toBe("yellow")
  expect(tierAt(9, FALLING)?.nextTier).toBe("blue")
  expect(tierAt(0, FALLING)?.nextTier).toBeNull()
})

test("how far a falling reading has come is the fraction of its band it has come down", () => {
  expect(tierAt(55, FALLING)?.progress).toBe(0.5)
  expect(tierAt(10, FALLING)?.progress).toBe(1)
  expect(tierAt(5.5, FALLING)?.progress).toBe(0.5)
  expect(tierAt(1, FALLING)?.progress).toBe(1)
})

test("a reading over every rung of a falling scale has come an unknown fraction rather than none", () => {
  expect(tierAt(240, FALLING)?.progress).toBeNull()
  expect(tierAt(100, FALLING)?.progress).toBeNull()
})

test("an inbox at empty is blue and one over a hundred is black", () => {
  const lowest = rungsIn({ blackAt: 100, redAt: 20, yellowAt: 10, greenAt: 1, blueAt: 0 })
  expect(tierAt(0, lowest)?.tier).toBe("blue")
  expect(tierAt(101, lowest)?.tier).toBe("black")
  expect(tierAt(9, lowest)?.tier).toBe("green")
})

test("a readout stating no format has its reading said as the number it is", () => {
  expect(readingSaid(2.5)).toBe("2.5")
  expect(readingSaid(3)).toBe("3")
  expect(readingSaid(-1.5)).toBe("-1.5")
  expect(readingSaid(-0.008333333333334636)).toBe("-0.008333333333334636")
})

test("a figure written as a decimal is written to no more than two places", () => {
  expect(readingSaid(-0.008333333333334636, "decimal")).toBe("-0.01")
  expect(readingSaid(8.666666666666666, "decimal")).toBe("8.67")
  expect(readingSaid(-3.256, "decimal")).toBe("-3.26")
})

test("a figure written as a decimal drops the places it has nothing to put in them", () => {
  expect(readingSaid(2.5, "decimal")).toBe("2.5")
  expect(readingSaid(3, "decimal")).toBe("3")
  expect(readingSaid(-2, "decimal")).toBe("-2")
})

test("a figure written as an integer is written to the nearest whole number", () => {
  expect(readingSaid(2.5, "integer")).toBe("3")
  expect(readingSaid(-3.4, "integer")).toBe("-3")
  expect(readingSaid(7, "integer")).toBe("7")
})

test("a figure that rounds onto zero is written as zero rather than as a signed zero", () => {
  expect(readingSaid(-0.001, "decimal")).toBe("0")
  expect(readingSaid(-0.4, "integer")).toBe("0")
})

test("a format no page states leaves the reading said as the number it is", () => {
  expect(readingSaid(-0.008333333333334636, "duration")).toBe("-0.008333333333334636")
})
