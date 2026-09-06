import { expect, test } from "bun:test"
import { flooredTo, linesOf, measuredIn } from "./measure-attributes.command.code.ts"

const DRAWN = new Map([
  ["attribute-strength", { label: "Strength", place: 1 }],
  ["attribute-charisma", { label: "Charisma", place: 6 }],
])

const AT = "readout-system/readouts/pages"

const STRENGTH = `${AT}/attribute-strength/attribute-strength.readout.ts`

const CHARISMA = `${AT}/attribute-charisma/attribute-charisma.readout.ts`

test("a figure is floored to two places rather than rounded", () => {
  expect(flooredTo(2.703413740236413, 2)).toBe(2.7)
  expect(flooredTo(0.0224, 2)).toBe(0.02)
  expect(flooredTo(0.999, 2)).toBe(0.99)
  expect(flooredTo(0, 2)).toBe(0)
})

test("the attributes come back in the order their readouts state", () => {
  const taken = { kept: { [CHARISMA]: 1.5, [STRENGTH]: 2.75 }, unread: [] }
  expect(measuredIn(taken, DRAWN)).toEqual([
    { label: "Strength", figure: 2.75 },
    { label: "Charisma", figure: 1.5 },
  ])
})

test("a reading whose readout is drawn in no group here is left out", () => {
  const taken = {
    kept: { "readout-system/readouts/pages/plants/plants.readout.ts": 4 },
    unread: [],
  }
  expect(measuredIn(taken, DRAWN)).toEqual([])
})

test("the labels are padded so the figures line up", () => {
  expect(
    linesOf([
      { label: "Strength", figure: 2.7 },
      { label: "Wisdom", figure: 0.02 },
    ])
  ).toEqual(["Strength  2.7", "Wisdom    0.02"])
})
