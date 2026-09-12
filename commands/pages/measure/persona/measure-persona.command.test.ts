import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { linesOf } from "akasha/commands/pages/measure/measure-tabling/measure-tabling.module.code.ts"
import {
  measuredIn,
  measurePersona,
  type Named,
  untotalledOf,
} from "akasha/commands/pages/measure/persona/measure-persona.command.code.ts"
import { rungAt } from "akasha/personas/properties/persona-relationship-level.computed-property.test-fixtures.ts"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: "akasha measure persona",
  from: NOWHERE,
  writer: null,
  agentId: null,
}

test("a flag is refused, and the refusal says this takes no argument at all", () => {
  const said = measurePersona(["--json"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--json` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a word naming a persona is refused, since this answers every persona", () => {
  const said = measurePersona(["wren"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("it takes none")
})

const NAMED: readonly Named[] = [
  { slug: "wren", label: "Wren", path: "lumen/pages/wren/wren.persona.ts" },
  { slug: "dove", label: "Dove", path: "lumen/pages/dove/dove.persona.ts" },
  { slug: "ash", label: "Ash", path: "lumen/pages/ash/ash.persona.ts" },
]

const KEPT: Readonly<Record<string, number>> = { wren: 30.005, dove: 30.005, ash: 7 }

const totalOf = (one: Named): number | null => KEPT[one.slug] ?? null

test("a persona carrying no total is left out of the lines", () => {
  const named = [...NAMED, { slug: "swift", label: "Swift", path: "lumen/pages/swift/swift.ts" }]
  expect(measuredIn(named, totalOf, rungAt).map((one) => one.label)).toEqual([
    "Dove",
    "Wren",
    "Ash",
  ])
})

test("a level is the rung her total has reached", () => {
  expect(measuredIn(NAMED, totalOf, rungAt).map((one) => one.level)).toEqual([2, 2, 1])
})

test("two personas on one total sit in the order of their names", () => {
  expect(
    measuredIn(NAMED, totalOf, rungAt)
      .slice(0, 2)
      .map((one) => one.label)
  ).toEqual(["Dove", "Wren"])
})

test("each column is written to the width of its widest entry", () => {
  expect(linesOf(measuredIn(NAMED, totalOf, rungAt))).toEqual([
    "Dove  2  30.00",
    "Wren  2  30.00",
    "Ash   1   7.00",
  ])
})

test("one persona carrying no total is counted in the singular", () => {
  expect(untotalledOf(4, 3)).toEqual(["", "1 persona carries no total yet"])
})

test("more than one persona carrying no total is counted in the plural", () => {
  expect(untotalledOf(9, 3)).toEqual(["", "6 personas carry no total yet"])
})

test("every persona carrying a total is counted with no line beneath", () => {
  expect(untotalledOf(3, 3)).toEqual([])
})
