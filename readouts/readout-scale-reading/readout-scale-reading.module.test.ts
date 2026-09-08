import { expect, test } from "bun:test"
import { answering } from "../readout-answering/readout-answering.module.code.ts"
import { readScale, scaleIn } from "./readout-scale-reading.module.code.ts"

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
