import { expect, test } from "bun:test"
import {
  removePropertyFromPageType,
  runChange,
} from "akasha/changes/mechanical/page-type/remove/remove-property-from-page-type/remove-property-from-page-type.change-mechanical-page-type.code.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"

const AT = "thrumming/moots/moot.page-type.ts"

const PROPERTY_AT = "thrumming/moots/properties/sung-at.moot-property.ts"

const PROPERTY = "moot-property/sung-at"

const HELD = "moot-property/weight"

const BODY = `export const moot = {
  type: "page-type",
  slug: "moot",
  parts: ["moot-property/sung-at", "moot-property/weight"],
  properties: [
    { pageProperty: "moot-property/sung-at", required: false, many: false },
    { pageProperty: "moot-property/weight", required: false, many: false },
  ],
} as const satisfies PageType
`

const REACHED: string[] = []

type Holding = {
  readonly listed?: boolean
  readonly owner?: boolean
  readonly parted?: boolean
}

function worldFor(holding: Holding = {}): World {
  const parts = holding.parted === false ? [HELD] : [PROPERTY, HELD]
  return {
    root: "/nowhere",
    index: {
      listedAt: () => (holding.listed === false ? [] : [{ path: PROPERTY_AT, id: PROPERTY_AT }]),
      pageByPath: () => (holding.owner === false ? null : { slug: "moot", parts }),
    } as never,
    textOf: () => BODY,
    bodyOf: () => BODY,
    under: () => [],
    base: () => BODY,
    over: NOTHING_OVER,
    reaching: listing(REACHED),
  }
}

function bodyFor(holding: Holding = {}, property: string = PROPERTY): string {
  const world = worldFor(holding)
  const said = removePropertyFromPageType(world, { at: AT, property })
  return bodiesIn(said, world.base).get(AT) ?? ""
}

test("the part and the declaration are one answer over one reading of the body", () => {
  const body = bodyFor()

  expect(body).not.toContain(PROPERTY)
  expect(body).toContain(HELD)
})

test("the declaration taken out is the one naming that property", () => {
  expect(bodyFor()).toContain(`{ pageProperty: "${HELD}", required: false, many: false },`)
})

test("a page type that declares a property without parting it loses the declaration alone", () => {
  const body = bodyFor({ parted: false })

  expect(body).toContain(`parts: ["${PROPERTY}", "${HELD}"],`)
  expect(body).not.toContain(`{ pageProperty: "${PROPERTY}"`)
})

test("a slug naming no page property is refused before the body is read", () => {
  const said = removePropertyFromPageType(worldFor({ listed: false }), {
    at: AT,
    property: PROPERTY,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page property")
})

test("a slug carrying no page type is refused", () => {
  const said = removePropertyFromPageType(worldFor(), { at: AT, property: "sung-at" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page property")
})

test("a path naming no page type is refused before the body is read", () => {
  const said = runChange(worldFor({ owner: false }), { at: AT, property: PROPERTY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page type")
})

test("a page type declaring that property nowhere is refused by its path", () => {
  const said = removePropertyFromPageType(worldFor({ parted: false }), {
    at: AT,
    property: "moot-property/nine",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("no record under `properties`")
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = removePropertyFromPageType(worldFor(), { at: AT, property: PROPERTY })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
