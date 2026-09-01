import { expect, test } from "bun:test"
import type { Fetcher } from "@akasha/pages-query/fetcher"
import {
  declaredThreshold,
  readBacklogCountScale,
  scaleIn,
} from "./readout-scale-reading.module.code.ts"

const refusing: Fetcher = async () =>
  new Response(JSON.stringify({ refused: "no" }), { status: 500 })

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

test("a store that answers nothing gives no scale", async () => {
  expect(await readBacklogCountScale(refusing)).toBe(undefined)
})
