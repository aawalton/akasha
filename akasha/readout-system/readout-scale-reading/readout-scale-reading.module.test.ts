import { expect, test } from "bun:test"
import {
  declaredThreshold,
  readBacklogCountScale,
  scaleIn,
} from "./readout-scale-reading.module.code.ts"

test("a rung stated as a number is that number", () => {
  expect(declaredThreshold(11)).toBe(11)
  expect(declaredThreshold(0)).toBe(0)
})

test("a rung stated as text is read as the number it spells", () => {
  expect(declaredThreshold(" 21 ")).toBe(21)
})

test("a rung stating no number is no rung", () => {
  expect(declaredThreshold("")).toBe(null)
  expect(declaredThreshold("   ")).toBe(null)
  expect(declaredThreshold("soon")).toBe(null)
  expect(declaredThreshold(Number.POSITIVE_INFINITY)).toBe(null)
  expect(declaredThreshold(null)).toBe(null)
  expect(declaredThreshold(undefined)).toBe(null)
  expect(declaredThreshold(true)).toBe(null)
})

test("a page stating every rung the ring needs is a scale", () => {
  expect(scaleIn({ "orange-at": 11, "red-at": 21, "black-at": 31 })).toEqual({
    orangeAt: 11,
    redAt: 21,
    blackAt: 31,
  })
})

test("the yellow rung is carried only where the page states it", () => {
  expect(scaleIn({ "orange-at": 11, "red-at": 21, "black-at": 31, "yellow-at": 0 })).toEqual({
    orangeAt: 11,
    redAt: 21,
    blackAt: 31,
    yellowAt: 0,
  })
})

test("a page missing a rung the ring needs is no scale", () => {
  expect(scaleIn({ "red-at": 21, "black-at": 31 })).toBe(undefined)
  expect(scaleIn({ "orange-at": 11, "black-at": 31 })).toBe(undefined)
  expect(scaleIn({ "orange-at": 11, "red-at": 21 })).toBe(undefined)
  expect(scaleIn({})).toBe(undefined)
})

test("the rungs the backlog-count page states are read from the store", async () => {
  const scale = await readBacklogCountScale()
  expect(scale).not.toBe(undefined)
  const rungs = scale as NonNullable<typeof scale>
  expect(rungs.orangeAt).toBeLessThan(rungs.redAt)
  expect(rungs.redAt).toBeLessThan(rungs.blackAt)
})
