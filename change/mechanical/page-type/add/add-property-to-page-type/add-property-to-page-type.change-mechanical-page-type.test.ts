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
import { parts } from "akasha/domain/properties/parts.relation-property.ts"
import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { relationProperty } from "akasha/page/relation-property/relation-property.page-type.ts"

const AT = "thrumming/moots/moot.page-type.ts"

const PROPERTY_AT = "thrumming/moots/properties/sung-at.moot-property.ts"

const OUTSIDE_AT = "elsewhere/sung-at.moot-property.ts"

const PROPERTY = "moot-property/sung-at"

const HELD = "moot-property/weight"

const PARTS_AT = `${relationProperty.slug}/${parts.slug}` as const

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
  readonly elsewhere?: ReadonlyMap<string, boolean>
}

function carriedFor(slug: string, many: boolean): unknown {
  return { pagePropertySlug: "sung-at", pageTypeSlug: "moot-property", declaredBy: slug, many }
}

function worldFor(holding: Holding = {}): World {
  const body = holding.body ?? BODY
  const path = holding.path ?? PROPERTY_AT
  const elsewhere = holding.elsewhere ?? new Map<string, boolean>()
  const shapes = new Map<string, Shape>([[PARTS_AT, shaped(holding.sorted === true)]])
  return {
    root: "/nowhere",
    index: {
      listedAt: () => (holding.listed === false ? [] : [{ path, id: path }]),
      pageByPath: () => (holding.owner === false ? null : { slug: "moot" }),
      shapesAt: () => shapes,
      pageTypesIn: () => new Set(elsewhere.keys()),
      propertiesOf: (slug: string) => {
        const many = elsewhere.get(slug)
        return many === undefined ? [] : [carriedFor(slug, many)]
      },
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

test("a property another page type declares holding one is refused here holding many", () => {
  const said = addPropertyToPageType(worldFor({ elsewhere: new Map([["gathering", false]]) }), {
    at: AT,
    property: PROPERTY,
    required: false,
    many: true,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`gathering` declares `moot-property/sung-at` holding one")
})

test("a property another page type declares holding many is refused here holding one", () => {
  const said = addPropertyToPageType(worldFor({ elsewhere: new Map([["gathering", true]]) }), {
    at: AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`gathering` declares `moot-property/sung-at` holding many")
})

test("that refusal names those page types, what they hold, and the act that turns it", () => {
  const said = addPropertyToPageType(
    worldFor({
      elsewhere: new Map([
        ["gathering", true],
        ["revel", true],
      ]),
    }),
    { at: AT, property: PROPERTY, required: false, many: false }
  )

  expect(said.refused ?? "").toContain("`gathering` and `revel` declare")
  expect(said.refused ?? "").toContain("holding many")
  expect(said.refused ?? "").toContain("`change-property-on-page-type`")
})

test("that refusal is answered before the path is read", () => {
  const said = addPropertyToPageType(
    worldFor({ owner: false, elsewhere: new Map([["gathering", true]]) }),
    { at: AT, property: PROPERTY, required: false, many: false }
  )

  expect(said.refused ?? "").toContain("`gathering`")
})

test("a property another page type declares the same way is declared here", () => {
  const body = bodyFor({ elsewhere: new Map([["gathering", false]]) })

  expect(body).toContain(`pageProperty: "${PROPERTY}"`)
})

test("a property no page type declares elsewhere is declared here", () => {
  const body = bodyFor({ elsewhere: new Map() })

  expect(body).toContain(`pageProperty: "${PROPERTY}"`)
})
