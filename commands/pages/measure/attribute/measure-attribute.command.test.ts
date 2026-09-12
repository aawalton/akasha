import { expect, test } from "bun:test"
import {
  type Drawn,
  measuredIn,
} from "akasha/commands/pages/measure/attribute/measure-attribute.command.code.ts"

const DRAWN: readonly Drawn[] = [
  { label: "Strength", place: 1, attributeSlug: "strength" },
  { label: "Charisma", place: 6, attributeSlug: "charisma" },
]

const KEPT: Readonly<Record<string, number>> = { strength: 45.44, charisma: 1.5 }

const totalOf = (slug: string) => KEPT[slug] ?? null

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
