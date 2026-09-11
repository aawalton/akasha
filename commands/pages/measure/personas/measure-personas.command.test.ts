import { expect, test } from "bun:test"
import { linesOf } from "akasha/commands/modules/measure-tabling/measure-tabling.module.code.ts"
import {
  measuredIn,
  type Named,
  untotalledOf,
} from "akasha/commands/pages/measure/personas/measure-personas.command.code.ts"

const NAMED: readonly Named[] = [
  { slug: "wren", label: "Wren", path: "lumen/pages/wren/wren.persona.ts" },
  { slug: "dove", label: "Dove", path: "lumen/pages/dove/dove.persona.ts" },
  { slug: "ash", label: "Ash", path: "lumen/pages/ash/ash.persona.ts" },
]

const KEPT: Readonly<Record<string, number>> = { wren: 30.005, dove: 30.005, ash: 7 }

const RUNGS: Readonly<Record<number, number>> = { 1: 7, 2: 28, 3: 88, 4: 268, 5: 808, 6: 2428 }

const totalOf = (one: Named): number | null => KEPT[one.slug] ?? null

const rungAt = (rung: number): number | null => RUNGS[rung] ?? null

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
