import { expect, test } from "bun:test"
import {
  addPropertyToPageType,
  recordFor,
  runChange,
} from "akasha/change/mechanical/page-type/add/add-property-to-page-type/add-property-to-page-type.change-mechanical-page-type.code.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const AT = "thrumming/moots/moot.page-type.ts"

const PROPERTY_AT = "thrumming/moots/properties/sung-at.moot-property.ts"

const OUTSIDE_AT = "elsewhere/sung-at.moot-property.ts"

const PROPERTY = "moot-property/sung-at"

const HELD = "moot-property/weight"

const BODY = `export const moot = {
  type: "page-type",
  slug: "moot",
  parts: ["moot-property/weight"],
  properties: [
    { pageProperty: "moot-property/weight", required: false, many: false },
  ],
} as const satisfies PageType
`

const PARTLESS = `export const moot = {
  type: "page-type",
  slug: "moot",
  properties: [
    { pageProperty: "moot-property/weight", required: false, many: false },
  ],
} as const satisfies PageType
`

const REACHED: string[] = []

function shaped(sorted: boolean): Shape {
  return {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: null,
    unique: null,
    uniquePropertySlug: null,
    slug: "parts",
    propertySlug: "parts",
    fileName: null,
    folderName: null,
    sorted,
  }
}

type Holding = {
  readonly listed?: boolean
  readonly owner?: boolean
  readonly sorted?: boolean
  readonly path?: string
  readonly body?: string
}

function worldFor(holding: Holding = {}): World {
  const body = holding.body ?? BODY
  const path = holding.path ?? PROPERTY_AT
  const shapes = new Map<string, Shape>([
    ["relation-property/parts", shaped(holding.sorted === true)],
  ])
  return {
    root: "/nowhere",
    index: {
      listedAt: () => (holding.listed === false ? [] : [{ path, id: path }]),
      pageByPath: () => (holding.owner === false ? null : { slug: "moot" }),
      shapesAt: () => shapes,
    } as never,
    textOf: () => body,
    bodyOf: () => body,
    under: () => [],
    base: () => body,
    over: NOTHING_OVER,
    reaching: listing(REACHED),
  }
}

function bodyFor(holding: Holding = {}, property: string = PROPERTY): string {
  const world = worldFor(holding)
  const said = addPropertyToPageType(world, {
    at: AT,
    property,
    required: false,
    many: false,
  })
  return bodiesIn(said, world.base).get(AT) ?? ""
}

test("the declaration and the part are one answer over one reading of the body", () => {
  const body = bodyFor()

  expect(body).toContain(`{ pageProperty: "${PROPERTY}", required: false, many: false },`)
  expect(body).toContain(`"moot-property/weight", "${PROPERTY}"`)
})

test("a page type naming no part yet gains its first part under that same key", () => {
  expect(bodyFor({ body: PARTLESS })).toContain(`parts: ["${PROPERTY}"],`)
})

test("a part is written in order where the index says that key is sorted", () => {
  expect(bodyFor({ sorted: true })).toContain(`parts: ["${PROPERTY}", "moot-property/weight"],`)
})

test("a property sitting outside the page type's folder is declared the same way", () => {
  expect(bodyFor({ path: OUTSIDE_AT })).toContain(`pageProperty: "${PROPERTY}"`)
})

test("a declaration with many values states a count", () => {
  const record = recordFor({
    at: AT,
    property: PROPERTY,
    required: true,
    many: true,
    maxCount: "30",
  })

  expect(record).toContain("maxCount: 30")
})

test("a count the change is not told is stated as nothing", () => {
  const record = recordFor({ at: AT, property: PROPERTY, required: true, many: true })

  expect(record).toContain("maxCount: null")
})

test("a declaration with one value states no count", () => {
  const record = recordFor({ at: AT, property: PROPERTY, required: true, many: false })

  expect(record).not.toContain("maxCount")
})

test("a slug naming no page property is refused before the body is read", () => {
  const said = addPropertyToPageType(worldFor({ listed: false }), {
    at: AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page property")
})

test("a slug carrying no page type is refused", () => {
  const said = addPropertyToPageType(worldFor(), {
    at: AT,
    property: "sung-at",
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page property")
})

test("a path naming no page type is refused before the body is read", () => {
  const said = runChange(worldFor({ owner: false }), {
    at: AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page type")
})

test("a page type stating that property already is refused by its path", () => {
  const said = addPropertyToPageType(worldFor(), {
    at: AT,
    property: HELD,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("holds that record already")
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = addPropertyToPageType(worldFor(), {
    at: AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
