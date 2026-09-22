import { expect, test } from "bun:test"
import {
  addPropertyToEveryPage,
  runChange,
} from "akasha/change/mechanical/page-type/add/add-property-to-every-page/add-property-to-every-page.change-mechanical-page-type.code.ts"
import {
  BODIES,
  DECLARED,
  type Files,
  KEY,
  MANY,
  mootAt,
  worldFor as mootsWorld,
  ONE_AT,
  PUTTING,
  TWO_AT,
  TYPE,
  VALUES,
} from "akasha/change/mechanical/page-type/add/add-property-to-every-page/add-property-to-every-page.change-mechanical-page-type.test-fixtures.ts"
import { valueSpelled } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const REACHED: string[] = []

function worldFor(
  bodies: Files,
  carried: readonly Carried[] | null,
  values: ReadonlyMap<string, Value> = VALUES
): World {
  return mootsWorld(bodies, carried, listing(REACHED), values)
}

test("every page of that page type is answered in this one answer", () => {
  const world = worldFor(BODIES, [DECLARED])

  const said = addPropertyToEveryPage(world, PUTTING)

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`${KEY}: "aine"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`${KEY}: "aine"`)
})

test("the key lands where the pages of that page type write it", () => {
  const world = worldFor(BODIES, [DECLARED])

  const said = addPropertyToEveryPage(world, PUTTING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `slug: "one",\n  ${KEY}: "aine",\n  weight: 1,`
  )
})

test("an `after` the caller states places the key on every page", () => {
  const world = worldFor(BODIES, [DECLARED])

  const said = addPropertyToEveryPage(world, { ...PUTTING, after: "weight" })

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`weight: 1,\n  ${KEY}: "aine",`)
})

test("a page the index files no value for gains the key last", () => {
  const world = worldFor(BODIES, [DECLARED], new Map<string, Value>())

  const said = addPropertyToEveryPage(world, PUTTING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`weight: 1,\n  ${KEY}: "aine",`)
})

test("a page type carrying no property under the key is refused", () => {
  const said = addPropertyToEveryPage(worldFor(BODIES, []), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`a \`${TYPE}\` carries no property under \`${KEY}\``)
})

test("a key the page type says carries many values is refused", () => {
  const said = addPropertyToEveryPage(worldFor(BODIES, [MANY]), { ...PUTTING, key: "weights" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`weights` carries many values, so one value states nothing")
})

test("a page type the index does not name is refused", () => {
  const said = addPropertyToEveryPage(worldFor(BODIES, null), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TYPE}\` names no page type`)
})

test("a page type no page is of is refused rather than answered as no edit", () => {
  const said = addPropertyToEveryPage(worldFor({}, [DECLARED]), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no page is a \`${TYPE}\``)
})

test("a value naming anything the body would run is no value", () => {
  expect(valueSpelled(`"aine"`)).toBe(true)
  expect(valueSpelled("[1, 2]")).toBe(true)
  expect(valueSpelled(`{ held: "aine" }`)).toBe(true)
  expect(valueSpelled("heldBy")).toBe(false)
  expect(valueSpelled("held(1)")).toBe(false)
})

test("a value that parses as no value is refused before any page is read", () => {
  const said = addPropertyToEveryPage(worldFor(BODIES, null), { ...PUTTING, value: "held(1)" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`held(1)` parses as no value, so nothing is put in")
})

test("a key no page spells is refused", () => {
  const said = addPropertyToEveryPage(worldFor(BODIES, [DECLARED]), { ...PUTTING, key: "held-by" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`held-by` is no key a page spells")
})

test("a page stating the key already is refused by its path", () => {
  const held = {
    ...BODIES,
    [TWO_AT]: mootAt("two").replace("  weight: 1,\n", `  ${KEY}: "alan",\n`),
  }

  const said = runChange(worldFor(held, [DECLARED]), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
  expect(said.refused ?? "").toContain("is a restatement")
})

test("a page exporting no object is refused by its path", () => {
  const said = addPropertyToEveryPage(
    worldFor({ ...BODIES, [TWO_AT]: "const two = 1\n" }, [DECLARED]),
    PUTTING
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TWO_AT}\` exports no object`)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = addPropertyToEveryPage(worldFor(BODIES, [DECLARED]), PUTTING)

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
