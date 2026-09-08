import { expect, test } from "bun:test"
import { saidOf, slugsIn } from "./refresh-attributes.command.code.ts"

const AT = "alan/attributes/readouts"

const STRENGTH = `${AT}/attribute-strength/attribute-strength.readout.ts`

const WISDOM = `${AT}/attribute-wisdom/attribute-wisdom.readout.ts`

test("each readout's figure is filed under the attribute that readout counts", () => {
  expect([...slugsIn({ [STRENGTH]: 4.5, [WISDOM]: 1 })]).toEqual([
    ["strength", 4.5],
    ["wisdom", 1],
  ])
})

test("a figure whose readout counts no attribute is left out", () => {
  expect([
    ...slugsIn({ "readout-system/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts": 7 }),
  ]).toEqual([])
})

test("a figure of zero is a figure rather than an absent one", () => {
  expect([...slugsIn({ [STRENGTH]: 0 })]).toEqual([["strength", 0]])
})

test("one attribute rebuilt is said in the singular", () => {
  expect(saidOf(1)).toBe("1 attribute was rebuilt from the days before today")
})

test("more than one attribute rebuilt is said in the plural", () => {
  expect(saidOf(6)).toBe("6 attributes were rebuilt from the days before today")
})
