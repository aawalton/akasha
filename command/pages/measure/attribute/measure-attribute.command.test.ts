import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Drawn,
  measureAttribute,
  measuredIn,
} from "akasha/command/pages/measure/attribute/measure-attribute.command.code.ts"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: "akasha measure attribute",
  from: NOWHERE,
  writer: null,
  agentId: null,
}

test("a flag is refused, and the refusal says this takes no argument at all", async () => {
  const said = await measureAttribute(["--json"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--json` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a word naming an attribute is refused, since this answers every attribute", async () => {
  const said = await measureAttribute(["strength"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("it takes none")
})

const DRAWN: readonly Drawn[] = [
  { label: "Strength", place: 1, attributeSlug: "strength" },
  { label: "Charisma", place: 6, attributeSlug: "charisma" },
]

const KEPT: Readonly<Record<string, number>> = { strength: 45.44, charisma: 1.5 }

const totalOf = (slug: string) => KEPT[slug] ?? null

test("the total shown is the one added up over the days", () => {
  expect(measuredIn(DRAWN, totalOf).measured).toEqual([
    { label: "Strength", level: 3, figure: 45.44 },
    { label: "Charisma", level: 0, figure: 1.5 },
  ])
})

test("an attribute no day counts is named rather than drawn at level 0", () => {
  const read = measuredIn([{ label: "Wisdom", place: 4, attributeSlug: "wisdom" }], totalOf)
  expect(read.measured).toEqual([])
  expect(read.unread).toEqual(["Wisdom — no day Alan tracked carries what this attribute counts"])
})
