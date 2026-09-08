import { expect, test } from "bun:test"
import {
  flooredTo,
  linesOf,
  measuredIn,
  type Named,
  untotalledOf,
} from "./measure-personas.command.code.ts"

const NAMED: readonly Named[] = [
  { slug: "aura", label: "Aura", path: "personas/pages/aura/aura.persona.ts" },
  { slug: "amy", label: "Amy", path: "personas/pages/amy/amy.persona.ts" },
  { slug: "ione", label: "Ione", path: "personas/pages/ione/ione.persona.ts" },
]

const KEPT: Readonly<Record<string, number>> = { aura: 30.005, amy: 30.005, ione: 7 }

const RUNGS: Readonly<Record<number, number>> = { 1: 7, 2: 28, 3: 88, 4: 268, 5: 808, 6: 2428 }

const totalOf = (one: Named): number | null => KEPT[one.slug] ?? null

const rungAt = (rung: number): number | null => RUNGS[rung] ?? null

test("a total is floored rather than rounded", () => {
  expect(flooredTo(0.999, 2)).toBe(0.99)
})

test("a persona carrying no total is left out of the lines", () => {
  const named = [...NAMED, { slug: "nova", label: "Nova", path: "personas/pages/nova/nova.ts" }]
  expect(measuredIn(named, totalOf, rungAt).map((one) => one.label)).toEqual([
    "Amy",
    "Aura",
    "Ione",
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
  ).toEqual(["Amy", "Aura"])
})

test("each column is written to the width of its widest entry", () => {
  expect(linesOf(measuredIn(NAMED, totalOf, rungAt))).toEqual([
    "Amy   2  30.00",
    "Aura  2  30.00",
    "Ione  1   7.00",
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
