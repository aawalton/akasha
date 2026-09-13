import { expect, test } from "bun:test"
import { generateClassMappings } from "akasha/temper/addon-data/modules/class-mappings/class-mappings.module.code.ts"
import { classes } from "akasha/temper/classes/modules/character-class/character-class.module.code.ts"

const NO_CLASS = "no-class"

test("a class id the game adds falls back to the place `no-class` has", () => {
  const at = classes.ids.indexOf(NO_CLASS)
  expect(at).toBeGreaterThan(-1)
  const rendered = generateClassMappings()
  expect(rendered).toContain(`const NO_CLASS_INDEX = ${String(at)}`)
  expect(rendered).toContain("CLASS_ESO_ID_TO_INDEX[esoClassId] ?? NO_CLASS_INDEX")
})

test("no real class is written at the place an unknown class falls back to", () => {
  const at = classes.ids.indexOf(NO_CLASS)
  expect(generateClassMappings()).not.toContain(`]: ${String(at)}, //`)
})

test("the class that leads the tables is a real class, so falling back to it would be wrong", () => {
  const first = classes.ids[0]
  expect(first).toBeDefined()
  expect(first).not.toBe(NO_CLASS)
})
