import { expect, test } from "bun:test"
import { backlogCount } from "../readout-scales/pages/backlog-count.readout-scale.ts"
import { ReadoutRing, rungOf, statedIn, sweptBy } from "./readout-ring.module.code.tsx"

const ASCENDING = {
  id: "01a05453-a4f1-7185-b176-4cc4ae7266f7",
  pageTypeSlug: "readout-scale",
  slug: "ascending",
  definition: "how much is done",
  blackAt: 0,
  redAt: 10,
  yellowAt: 40,
  blueAt: 90,
} as const

test("a scale answers only the rungs it states", () => {
  expect(statedIn(backlogCount)).toEqual([31, 21, 11, 1])
})

test("a reading takes the rung stating the greatest number it has reached", () => {
  expect(rungOf(backlogCount, 35)).toBe("black")
  expect(rungOf(backlogCount, 31)).toBe("black")
  expect(rungOf(backlogCount, 30)).toBe("red")
  expect(rungOf(backlogCount, 21)).toBe("red")
  expect(rungOf(backlogCount, 20)).toBe("orange")
  expect(rungOf(backlogCount, 11)).toBe("orange")
  expect(rungOf(backlogCount, 10)).toBe("yellow")
  expect(rungOf(backlogCount, 1)).toBe("yellow")
})

test("one rule reads a scale whose numbers rise as readily as one whose numbers fall", () => {
  expect(rungOf(ASCENDING, 95)).toBe("blue")
  expect(rungOf(ASCENDING, 50)).toBe("yellow")
  expect(rungOf(ASCENDING, 5)).toBe("black")
})

test("a reading of nothing left has fallen below every rung and reaches none", () => {
  expect(rungOf(backlogCount, 0)).toBe(null)
})

test("a reading below every rung a scale states reaches no rung", () => {
  expect(rungOf(backlogCount, -1)).toBe(null)
})

test("the arc runs from the least rung a scale states to the greatest", () => {
  expect(sweptBy(backlogCount, 0)).toBe(0)
  expect(sweptBy(backlogCount, 31)).toBe(1)
  expect(sweptBy(backlogCount, 62)).toBe(1)
  expect(sweptBy(backlogCount, -5)).toBe(0)
})

test("a scale stating one rung sweeps nothing rather than dividing by nothing", () => {
  const alone = { ...backlogCount, orangeAt: undefined, redAt: undefined, blackAt: undefined }
  expect(sweptBy(alone, 4)).toBe(0)
})

test("the ring draws a figure carrying the rung its reading reached", () => {
  const drawn = ReadoutRing({ label: "Unreviewed", value: 25, scale: backlogCount })
  expect(drawn.type).toBe("figure")
})

test("the ring is written as a tag, and the tag names the component itself", () => {
  const written = <ReadoutRing label="Unreviewed" value={25} scale={backlogCount} />
  expect(written.type).toBe(ReadoutRing)
})
