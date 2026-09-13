import { expect, test } from "bun:test"
import {
  BODIES,
  CARRYING,
  worldFor as callsWorld,
  DECLARED,
  type Files,
  FROM,
  HOLDS_MANY,
  HOLDS_ONE,
  ONE_AT,
  TO,
  TWO_AT,
  TYPE,
  VALUES,
} from "akasha/changes/mechanical/page-type/add/copy-property-on-every-page/copy-property-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import {
  movePropertyOnEveryPage,
  runChange,
} from "akasha/changes/mechanical/page-type/move/move-property-on-every-page/move-property-on-every-page.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/pages/types/modules/declared-properties/declared-properties.module.code.ts"

const REACHED: string[] = []

function worldFor(
  bodies: Files,
  carried: readonly Carried[] | null,
  values: ReadonlyMap<string, Value> = VALUES
): World {
  return callsWorld(bodies, carried, listing(REACHED), values)
}

test("every page the value is carried on is answered in this one answer", () => {
  const world = worldFor(BODIES, DECLARED)

  const said = movePropertyOnEveryPage(world, CARRYING)

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`${TO}: "aine"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`${TO}: "alan"`)
})

test("the key written to takes the place the key read from held", () => {
  const world = worldFor(BODIES, DECLARED)

  const said = movePropertyOnEveryPage(world, CARRYING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `slug: "one",\n  ${TO}: "aine",\n  weight: 1,`
  )
})

test("the key read from goes with the value that key held", () => {
  const world = worldFor(BODIES, DECLARED)

  const said = movePropertyOnEveryPage(world, CARRYING)

  const body = bodiesIn(said, world.base).get(ONE_AT) ?? ""
  expect(body).not.toContain(FROM)
  expect(body).not.toContain(`["aine"]`)
})

test("a page already holding the key written to is passed over rather than refused", () => {
  const values = new Map<string, Value>([[ONE_AT, { [FROM]: ["aine"], [TO]: "aine" }]])

  const said = movePropertyOnEveryPage(worldFor(BODIES, DECLARED, values), CARRYING)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page with no value under the key read from is passed over rather than refused", () => {
  const values = new Map<string, Value>([[ONE_AT, { slug: "one" }]])

  const said = movePropertyOnEveryPage(worldFor(BODIES, DECLARED, values), CARRYING)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a list of more than one is refused where the key written to holds one value", () => {
  const values = new Map<string, Value>([[ONE_AT, { [FROM]: ["aine", "alan"] }]])

  const said = movePropertyOnEveryPage(worldFor(BODIES, DECLARED, values), CARRYING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`more than one value under \`${FROM}\``)
})

test("a page type with no property under the key written to is refused", () => {
  const said = movePropertyOnEveryPage(worldFor(BODIES, [HOLDS_MANY]), CARRYING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`a \`${TYPE}\` has no property under \`${TO}\``)
})

test("a page type with no property under the key read from is refused", () => {
  const said = movePropertyOnEveryPage(worldFor(BODIES, [HOLDS_ONE]), CARRYING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`a \`${TYPE}\` has no property under \`${FROM}\``)
})

test("a page type the index does not name is refused", () => {
  const said = movePropertyOnEveryPage(worldFor(BODIES, null), CARRYING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TYPE}\` names no page type`)
})

test("a count handed in bounds how many pages the value is moved on", () => {
  const world = worldFor(BODIES, DECLARED)

  const said = movePropertyOnEveryPage(world, { ...CARRYING, atMost: 1 })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ONE_AT])
})

test("a page exporting no object is refused by its path", () => {
  const held = { ...BODIES, [TWO_AT]: "const two = 1\n" }

  const said = runChange(worldFor(held, DECLARED), CARRYING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TWO_AT}\` exports no object`)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = movePropertyOnEveryPage(worldFor(BODIES, DECLARED), CARRYING)

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
