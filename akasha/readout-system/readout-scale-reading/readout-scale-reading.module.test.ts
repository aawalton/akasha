import { expect, test } from "bun:test"
import { answering } from "../readout-answering/readout-answering.module.code.ts"
import { declaredThreshold, readScale, scaleIn } from "./readout-scale-reading.module.code.ts"

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
  expect(scaleIn({ orangeAt: 11, redAt: 21, blackAt: 31 })).toEqual({
    orangeAt: 11,
    redAt: 21,
    blackAt: 31,
  })
})

test("the yellow rung is carried only where the page states it", () => {
  expect(scaleIn({ orangeAt: 11, redAt: 21, blackAt: 31, yellowAt: 0 })).toEqual({
    orangeAt: 11,
    redAt: 21,
    blackAt: 31,
    yellowAt: 0,
  })
})

test("a page missing a rung the ring needs is no scale", () => {
  expect(scaleIn({ redAt: 21, blackAt: 31 })).toBe(undefined)
  expect(scaleIn({ orangeAt: 11, blackAt: 31 })).toBe(undefined)
  expect(scaleIn({ orangeAt: 11, redAt: 21 })).toBe(undefined)
  expect(scaleIn({})).toBe(undefined)
})

test("the rungs the scale a caller names states are read off its row", async () => {
  const rows = [{ slug: "a-scale", orangeAt: 11, redAt: 21, blackAt: 31, yellowAt: 1 }]
  expect(await readScale("a-scale", answering({ rows }))).toEqual({
    orangeAt: 11,
    redAt: 21,
    blackAt: 31,
    yellowAt: 1,
  })
})

test("a scale no page names is no scale", async () => {
  expect(await readScale("no-scale-is-named-this", answering({ rows: [] }))).toBe(undefined)
})

test("a store that answers nothing gives no scale", async () => {
  expect(await readScale("a-scale", answering({ refused: "no" }))).toBe(undefined)
})
