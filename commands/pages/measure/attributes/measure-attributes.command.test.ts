import { expect, test } from "bun:test"
import { type Drawn, flooredTo, linesOf, measuredIn } from "./measure-attributes.command.code.ts"

const DRAWN: readonly Drawn[] = [
  { label: "Strength", place: 1, attributeSlug: "strength" },
  { label: "Charisma", place: 6, attributeSlug: "charisma" },
]

const KEPT: Readonly<Record<string, number>> = { strength: 45.44, charisma: 1.5 }

const totalOf = (slug: string) => KEPT[slug] ?? null

test("a figure is floored to two places rather than rounded", () => {
  expect(flooredTo(2.703413740236413, 2)).toBe(2.7)
  expect(flooredTo(0.0224, 2)).toBe(0.02)
  expect(flooredTo(0.999, 2)).toBe(0.99)
  expect(flooredTo(0, 2)).toBe(0)
})

test("the total shown is the one kept beside that attribute's page", () => {
  expect(measuredIn(DRAWN, totalOf).measured).toEqual([
    { label: "Strength", level: 3, figure: 45.44 },
    { label: "Charisma", level: 0, figure: 1.5 },
  ])
})

test("an attribute carrying no total is named rather than drawn at level 0", () => {
  const read = measuredIn([{ label: "Wisdom", place: 4, attributeSlug: "wisdom" }], totalOf)
  expect(read.measured).toEqual([])
  expect(read.unread).toEqual(["Wisdom — no total is kept beside this attribute's page"])
})

test("the labels are padded so the levels and the totals line up", () => {
  expect(
    linesOf([
      { label: "Strength", level: 3, figure: 45.44 },
      { label: "Wisdom", level: 0, figure: 0.02 },
    ])
  ).toEqual(["Strength  3  45.44", "Wisdom    0   0.02"])
})

test("a level of two digits leaves the totals in one column", () => {
  expect(
    linesOf([
      { label: "Strength", level: 12, figure: 3760 },
      { label: "Wisdom", level: 0, figure: 0.02 },
    ])
  ).toEqual(["Strength  12  3760.00", "Wisdom     0     0.02"])
})

test("a level is written as a whole number", () => {
  expect(linesOf([{ label: "Wisdom", level: 4, figure: 70 }])).toEqual(["Wisdom  4  70.00"])
})

test("a total with no hundredths and no tenths is written to two places anyway", () => {
  expect(linesOf([{ label: "Wisdom", level: 0, figure: 0 }])).toEqual(["Wisdom  0  0.00"])
  expect(linesOf([{ label: "Wisdom", level: 0, figure: 3 }])).toEqual(["Wisdom  0  3.00"])
})
