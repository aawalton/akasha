import { expect, test } from "bun:test"
import { levelIn } from "akasha/alan/harness/readouts/pages/upkeep-safety/upkeep-safety.readout.code.ts"

test("a level stated as text is read as the number that level spells", () => {
  expect(levelIn({ "safety-level": "3" })).toBe(3)
  expect(levelIn({ "safety-level": "2.5" })).toBe(2.5)
  expect(levelIn({ "safety-level": "-1.5" })).toBe(-1.5)
  expect(levelIn({ "safety-level": -2 })).toBe(-2)
})

test("a level of zero is a level rather than an absent one", () => {
  expect(levelIn({ "safety-level": "0" })).toBe(0)
})

test("a session carrying no level is no reading rather than a level of zero", () => {
  expect(levelIn({})).toBeNull()
  expect(levelIn({ "safety-level": "" })).toBeNull()
  expect(levelIn({ "safety-level": "   " })).toBeNull()
  expect(levelIn({ "safety-level": "soon" })).toBeNull()
  expect(levelIn({ "safety-level": null })).toBeNull()
})
