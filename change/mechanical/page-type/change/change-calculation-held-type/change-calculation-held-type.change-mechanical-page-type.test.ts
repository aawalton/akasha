import { expect, test } from "bun:test"
import {
  changeCalculationHeldType,
  runChange,
} from "akasha/change/mechanical/page-type/change/change-calculation-held-type/change-calculation-held-type.change-mechanical-page-type.code.ts"
import {
  APART,
  APART_CODE,
  AT,
  BODIES,
  BODY,
  BOTH,
  CODE,
  type Given,
  KIND,
  LOOSE,
  worldFor as mootsWorld,
  NAMED,
  REACHING,
  REACHING_AT,
  TYPES_IMPORT,
  WORK_AT,
} from "akasha/change/mechanical/page-type/change/change-calculation-held-type/change-calculation-held-type.change-mechanical-page-type.test-fixtures.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  faultSaid,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const REACHED: string[] = []

const NAMES_TYPE = "export const work: Work<Collection, MootsLeft>"

function worldFor(given: Given): World {
  return mootsWorld(given, listing(REACHED))
}

test("a calculation is named its property's written type", () => {
  const world = worldFor({ bodies: BODIES })

  const said = changeCalculationHeldType(world, {})

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(CODE) ?? "").toContain(NAMES_TYPE)
})

test("one page's code is changed by two edits over the one body", () => {
  const said = changeCalculationHeldType(worldFor({ bodies: BODIES }), {})

  expect(said.edits.map((one) => one.kind)).toEqual(["replace", "replace"])
})

test("the type is named beside whatever else the calculation takes that shape from", () => {
  const world = worldFor({ bodies: BODIES })

  const said = changeCalculationHeldType(world, {})

  expect(bodiesIn(said, world.base).get(CODE) ?? "").toContain(`${TYPES_IMPORT}\n${WORK_AT}`)
})

test("a calculation taking a reach as well is named beside the shape it takes", () => {
  const world = worldFor({ bodies: { [CODE]: REACHING } })

  const said = changeCalculationHeldType(world, {})

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(CODE) ?? "").toContain(`${TYPES_IMPORT}\n${REACHING_AT}`)
})

test("the code this change answers carries no parse fault", () => {
  const world = worldFor({ bodies: BODIES })

  const said = changeCalculationHeldType(world, {})

  expect(faultSaid(parsedAs(CODE, bodiesIn(said, world.base).get(CODE) ?? ""))).toBeNull()
})

test("a calculation already naming that type is passed over", () => {
  const said = changeCalculationHeldType(worldFor({ bodies: { [CODE]: NAMED } }), {})

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("every calculation names its property's type already")
})

test("a page whose type is written by nothing is passed over", () => {
  const said = changeCalculationHeldType(
    worldFor({ bodies: BODIES, stated: { types: undefined } }),
    {}
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("every calculation names its property's type already")
})

test("a slug making no type name refuses the change before any code is composed", () => {
  const said = changeCalculationHeldType(worldFor({ bodies: BODIES, slug: "moots left" }), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("no `export const` may be declared under")
})

test("a code file exporting no such calculation is refused rather than passed over", () => {
  const said = changeCalculationHeldType(worldFor({ bodies: { [CODE]: LOOSE } }), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/exports no calculation/)
  expect(said.refused ?? "").toContain(CODE)
})

test("a page type no page is of is refused rather than answered as no edit", () => {
  const said = changeCalculationHeldType(worldFor({ bodies: BODIES, kinds: [] }), {})

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no page is a \`${KIND}\``)
})

test("every calculation is answered in this one answer", () => {
  const world = worldFor({ bodies: BOTH, paths: [AT, APART] })

  const said = changeCalculationHeldType(world, {})

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(CODE) ?? "").toContain(NAMES_TYPE)
  expect(bodies.get(APART_CODE) ?? "").toContain(NAMES_TYPE)
})

test("a folder named holds the change to the pages sitting under that folder", () => {
  const world = worldFor({ bodies: BOTH, paths: [AT, APART] })

  const said = runChange(world, { under: "thrumming/" })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(CODE) ?? "").toContain(TYPES_IMPORT)
  expect(bodies.has(APART_CODE)).toBe(false)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = changeCalculationHeldType(worldFor({ bodies: { [CODE]: BODY } }), {})

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
