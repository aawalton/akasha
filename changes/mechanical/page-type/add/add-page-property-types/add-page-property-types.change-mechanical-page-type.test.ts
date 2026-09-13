import { expect, test } from "bun:test"
import {
  addPagePropertyTypes,
  runChange,
} from "akasha/changes/mechanical/page-type/add/add-page-property-types/add-page-property-types.change-mechanical-page-type.code.ts"
import {
  APART,
  APART_TO,
  AT,
  BODIES,
  BOTH,
  DECLARED,
  type Given,
  HELD,
  KIND,
  worldFor as mootsWorld,
  TO,
  USES,
  USING,
} from "akasha/changes/mechanical/page-type/add/add-page-property-types/add-page-property-types.change-mechanical-page-type.test-fixtures.ts"
import { bodiesIn, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"

const REACHED: string[] = []

const PUTTING = { pageType: KIND }

function worldFor(given: Given): World {
  return mootsWorld(given, listing(REACHED))
}

test("every page of that page type is answered in this one answer", () => {
  const world = worldFor({ bodies: BOTH, paths: [AT, APART] })

  const said = addPagePropertyTypes(world, PUTTING)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(AT) ?? "").toContain(`types: "ts"`)
  expect(bodies.get(APART) ?? "").toContain(`types: "ts"`)
  expect(bodies.get(TO) ?? "").toContain(HELD)
  expect(bodies.get(APART_TO) ?? "").toContain(HELD)
})

test("a types file that is not there yet is written rather than refused", () => {
  const said = addPagePropertyTypes(worldFor({ bodies: BODIES, paths: [AT] }), PUTTING)

  expect(said.edits.filter((one) => one.kind === "add").map((one) => one.path)).toEqual([TO])
})

test("the type leaves the page's own body", () => {
  const world = worldFor({ bodies: BODIES, paths: [AT] })

  const said = addPagePropertyTypes(world, PUTTING)

  const body = bodiesIn(said, world.base).get(AT) ?? ""
  expect(body).not.toContain(HELD)
  expect(body).toBe(DECLARED.replace("} as const\n", `  types: "ts",\n} as const\n`))
})

test("every body naming the type that moved is repointed", () => {
  const world = worldFor({
    bodies: { ...BODIES, [USES]: USING },
    importers: [USES],
    paths: [AT],
  })

  const said = addPagePropertyTypes(world, PUTTING)

  expect(bodiesIn(said, world.base).get(USES) ?? "").toContain(
    `from "./mortal.boolean-property.types.ts"`
  )
})

test("a page stating its type already is passed over rather than stating it twice", () => {
  const said = addPagePropertyTypes(
    worldFor({ bodies: BODIES, paths: [AT], stated: { types: "ts" } }),
    PUTTING
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`every \`${KIND}\` states its type already`)
})

test("a page type that is no page property is refused before any body is worked out", () => {
  const said = addPagePropertyTypes(worldFor({ bodies: BODIES, kinds: [], paths: [AT] }), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${KIND}\` names no page type a page property is`)
})

test("a page type no page is of is refused rather than answered as no edit", () => {
  const said = addPagePropertyTypes(worldFor({ bodies: BODIES, paths: [] }), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no page is a \`${KIND}\``)
})

test("one page refused refuses the whole change, and the refusal names that page", () => {
  const said = addPagePropertyTypes(worldFor({ bodies: { [AT]: DECLARED }, paths: [AT] }), PUTTING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("declares nothing named `Mortal`")
})

test("a folder named holds the change to the pages sitting under that folder", () => {
  const world = worldFor({ bodies: BOTH, paths: [AT, APART] })

  const said = runChange(world, { ...PUTTING, under: "thrumming/" })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.has(APART)).toBe(false)
  expect(bodies.get(TO) ?? "").toContain(HELD)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = addPagePropertyTypes(worldFor({ bodies: BODIES, paths: [AT] }), PUTTING)

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
