import { expect, test } from "bun:test"
import { changePropertyOnPageType } from "akasha/changes/mechanical/page-type/change/change-property-on-page-type/change-property-on-page-type.change-mechanical-page-type.code.ts"
import { bodiesIn, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/pages/types/modules/declared-properties/declared-properties.module.code.ts"

const TYPE = "kept-thing"

const TYPE_AT = "alan/kept/kept-thing.page-type.ts"

const PROPERTY = "text-property/kept-mark"

const KEY = "keptMark"

const ONE_AT = "alan/kept/one.kept-thing.ts"

const TWO_AT = "alan/kept/two.kept-thing.ts"

const SINGLE = `{ pageProperty: "${PROPERTY}", required: false, many: false }`

const MANY = `{ pageProperty: "${PROPERTY}", required: false, many: true, maxCount: null }`

const SAID = JSON.stringify("beta")

function typeBody(record: string): string {
  return `export const keptThing = {
  type: "page-type",
  slug: "${TYPE}",
  definition: "a thing kept for a test",
  properties: [
    ${record},
  ],
} as const satisfies PageType
`
}

function pageBody(slug: string, held: string): string {
  return `export const ${slug} = {
  pageTypeSlug: "${TYPE}",
  slug: "${slug}",
${held}} as const satisfies KeptThing
`
}

function declared(required: boolean, many: boolean): Declared {
  return {
    pagePropertySlug: "kept-mark",
    pageTypeSlug: "text-property",
    propertySlug: "kept-mark",
    key: KEY,
    unique: null,
    declaredBy: TYPE,
    required,
    many,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

function valuedAt(slug: string, held: Value): Value {
  return { pageTypeSlug: TYPE, slug, ...held }
}

function worldFor(
  record: string,
  pages: Readonly<Record<string, string>>,
  values: ReadonlyMap<string, Value>,
  carried: readonly Declared[] | null,
  seen: string[]
): World {
  const bodies = { [TYPE_AT]: typeBody(record), ...pages }
  return worldOfType(TYPE, bodies, carried, values, listing(seen))
}

test("a declaration narrowing to one value unwraps every page's list in this one answer", () => {
  const seen: string[] = []
  const world = worldFor(
    MANY,
    {
      [ONE_AT]: pageBody("one", `  ${KEY}: ["alpha"],\n`),
      [TWO_AT]: pageBody("two", `  ${KEY}: ["beta"],\n`),
    },
    new Map([
      [ONE_AT, valuedAt("one", { [KEY]: ["alpha"] })],
      [TWO_AT, valuedAt("two", { [KEY]: ["beta"] })],
    ]),
    [declared(false, true)],
    seen
  )

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(3)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(TYPE_AT) ?? "").toContain("required: false, many: false }")
  expect(bodies.get(ONE_AT) ?? "").toContain(`${KEY}: "alpha",`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`${KEY}: "beta",`)
  expect(seen).toEqual([])
})

test("a page stating more than one value is refused by its path where the declaration holds one", () => {
  const world = worldFor(
    MANY,
    { [TWO_AT]: pageBody("two", `  ${KEY}: ["alpha", "beta"],\n`) },
    new Map([[TWO_AT, valuedAt("two", { [KEY]: ["alpha", "beta"] })]]),
    [declared(false, true)],
    []
  )

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
  expect(said.refused ?? "").toContain("2 values")
})

test("a declaration widening to many wraps every page's value and states a count", () => {
  const seen: string[] = []
  const world = worldFor(
    SINGLE,
    { [ONE_AT]: pageBody("one", `  ${KEY}: "alpha",\n`) },
    new Map([[ONE_AT, valuedAt("one", { [KEY]: "alpha" })]]),
    [declared(false, false)],
    seen
  )

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: PROPERTY,
    required: false,
    many: true,
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(TYPE_AT) ?? "").toContain("many: true, maxCount: null }")
  expect(bodies.get(ONE_AT) ?? "").toContain(`${KEY}: ["alpha"],`)
  expect(seen).toEqual([])
})

test("a property becoming required puts the default on every page stating none", () => {
  const world = worldFor(
    SINGLE,
    { [ONE_AT]: pageBody("one", ""), [TWO_AT]: pageBody("two", `  ${KEY}: "alpha",\n`) },
    new Map([
      [ONE_AT, valuedAt("one", {})],
      [TWO_AT, valuedAt("two", { [KEY]: "alpha" })],
    ]),
    [declared(false, false)],
    []
  )

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: PROPERTY,
    required: true,
    many: false,
    default: SAID,
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(TYPE_AT) ?? "").toContain("required: true, many: false }")
  expect(bodies.get(ONE_AT) ?? "").toContain(`${KEY}: ${SAID},`)
})

test("a property becoming required with no default is refused by the page stating none", () => {
  const world = worldFor(
    SINGLE,
    { [ONE_AT]: pageBody("one", "") },
    new Map([[ONE_AT, valuedAt("one", {})]]),
    [declared(false, false)],
    []
  )

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: PROPERTY,
    required: true,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_AT)
  expect(said.refused ?? "").toContain("no default")
})

test("a path naming no page type is refused here", () => {
  const world = worldFor(SINGLE, {}, new Map(), [declared(false, false)], [])

  const said = changePropertyOnPageType(world, {
    at: ONE_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page type")
})

test("a property the page type carries nowhere is refused here", () => {
  const world = worldFor(SINGLE, {}, new Map(), [declared(false, false)], [])

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: "text-property/other-mark",
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("other-mark")
})

test("a page type the index does not name is refused here", () => {
  const world = worldFor(SINGLE, {}, new Map(), null, [])

  const said = changePropertyOnPageType(world, {
    at: TYPE_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TYPE}\` names no page type`)
})
