import { expect, test } from "bun:test"
import { addPageProperty } from "akasha/change/mechanical/page-property/add-page-property/add-page-property.change-mechanical.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const WOLD_AT = "akasha/wold/wold.text-property.ts"

const FLAG_AT = "akasha/flag/flag.boolean-property.ts"

const TYPE_AT = "akasha/quoin.page-type.ts"

const ONE_AT = "akasha/one/one.quoin.ts"

const TWO_AT = "akasha/two/two.quoin.ts"

const HAD_AT = "akasha/had/had.text-property.ts"

const WOLD = "text-property/wold"

const WOLD_BODY = `export const wold = {
  type: "text-property",
  slug: "wold",
  propertySlug: "wold",
  definition: "what a page says under wold",
  maxLength: 100,
  nameFormat: null,
} as const
`

const FLAG_BODY = `export const flag = {
  type: "boolean-property",
  slug: "flag",
  propertySlug: "flag",
  definition: "whether a page is flagged",
} as const
`

const TYPE_BODY = `export const quoin = {
  id: "quoin-id",
  type: "page-type",
  slug: "quoin",
  parts: ["text-property/zebra"],
  properties: [
    { pageProperty: "text-property/zebra", required: false, many: false },
  ],
} as const
`

const ONE_BODY = `export const one = {
  id: "one",
  pageTypeSlug: "quoin",
  slug: "one",
  note: "kept",
} as const
`

const TWO_BODY = `export const two = {
  id: "two",
  pageTypeSlug: "quoin",
  slug: "two",
  note: "kept",
} as const
`

const BODIES: Readonly<Record<string, string>> = {
  [HAD_AT]: WOLD_BODY,
  [TYPE_AT]: TYPE_BODY,
  [ONE_AT]: ONE_BODY,
  [TWO_AT]: TWO_BODY,
}

const VALUES: Readonly<Record<string, Value>> = {
  [TYPE_AT]: { id: "quoin-id", pageTypeSlug: "page-type", slug: "quoin" },
  [ONE_AT]: { id: "one", pageTypeSlug: "quoin", slug: "one", note: "kept" },
  [TWO_AT]: { id: "two", pageTypeSlug: "quoin", slug: "two", note: "kept" },
}

const UNDER: Readonly<Record<string, readonly string[]>> = {
  "page-property": ["text-property", "boolean-property"],
}

const PAGED: readonly (readonly [string, Value])[] = [
  [ONE_AT, VALUES[ONE_AT] as Value],
  [TWO_AT, VALUES[TWO_AT] as Value],
]

type Making = {
  readonly seen?: string[]
  readonly reads?: Map<string, number>
}

function worldIn(made: Making): World {
  const held = worldOf(BODIES)
  const reads = made.reads ?? new Map<string, number>()
  return {
    ...held,
    textOf: (path) => {
      reads.set(path, (reads.get(path) ?? 0) + 1)
      return held.textOf(path)
    },
    index: {
      pageByPath: (at: string) => VALUES[at] ?? null,
      kindsUnder: (slug: string) => new Set(UNDER[slug] ?? [slug]),
      valuesByPath: (slug: string) => new Map(slug === "quoin" ? PAGED : []),
    } as never,
    reaching: listing(made.seen ?? []),
  }
}

const TEXT = {
  at: WOLD_AT,
  body: WOLD_BODY,
  partOf: TYPE_AT,
  on: [TYPE_AT],
  required: true,
  many: false,
  default: "held",
} as const

test("the property's own page is written whole at the path handed in", () => {
  const said = addPageProperty(worldIn({}), TEXT)

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({ kind: "add", path: WOLD_AT, content: WOLD_BODY })
})

test("the declaration goes into the properties of every page type handed in", () => {
  const world = worldIn({})

  const said = addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, TYPE_AT)).toContain(
    `{ pageProperty: "${WOLD}", required: true, many: false, default: "held" }`
  )
})

test("the property is named among the parts of the one page handed in for that", () => {
  const world = worldIn({})

  const said = addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, TYPE_AT)).toContain(`"text-property/zebra", "${WOLD}"`)
})

test("the key is put on every page of those page types, holding that default", () => {
  const world = worldIn({})

  const said = addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, ONE_AT)).toContain('wold: "held"')
  expect(bodyAnswered(said, world, TWO_AT)).toContain('wold: "held"')
})

test("the key is written last on every page, since no page writes it yet", () => {
  const world = worldIn({})

  const said = addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, ONE_AT)).toContain('note: "kept",\n  wold: "held"')
})

test("one body is read once however many passages it gains", () => {
  const reads = new Map<string, number>()

  addPageProperty(worldIn({ reads }), TEXT)

  expect(reads.get(TYPE_AT)).toBe(1)
})

test("no page gains the key where the caller states no default", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, required: false, default: undefined })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).not.toContain(ONE_AT)
})

test("a declaration holding many values states a count, and that count is nothing", () => {
  const world = worldIn({})

  const said = addPageProperty(world, { ...TEXT, many: true, default: undefined })

  expect(bodyAnswered(said, world, TYPE_AT)).toContain(
    `{ pageProperty: "${WOLD}", required: true, many: true, maxCount: null }`
  )
})

test("a declaration holding many values is refused a default", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, many: true })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("a declaration holding many states no default")
})

test("a default is spelled as text on the declaration and as its own kind on a page", () => {
  const world = worldIn({})

  const said = addPageProperty(world, { ...TEXT, at: FLAG_AT, body: FLAG_BODY, default: "true" })

  expect(bodyAnswered(said, world, TYPE_AT)).toContain('default: "true"')
  expect(bodyAnswered(said, world, ONE_AT)).toContain("flag: true")
})

test("a default the property's kind cannot hold is refused", () => {
  const said = addPageProperty(worldIn({}), {
    ...TEXT,
    at: FLAG_AT,
    body: FLAG_BODY,
    default: "yes",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`yes` is no boolean, so `boolean-property/flag` holds it nowhere")
})

test("a path naming no page type a page property is is refused", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, at: "akasha/wold/wold.quoin.ts" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`quoin` names no page type a page property is")
})

test("a path already holding a body is refused rather than written over", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, at: HAD_AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds a body already")
})

test("a body stating no property slug is refused", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, body: "export const wold = {} as const\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("states no `propertySlug`")
})

test("a body exporting no object is refused", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, body: "export const wold = 1\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("exports no object")
})

test("a call naming no page type is refused", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, on: [] })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no page type declares \`${WOLD}\`, so no page would carry it`)
})

test("a path naming no page type is refused", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, on: [ONE_AT] })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page type, so nothing declares the property")
})

test("a page naming nothing among its parts is refused", () => {
  const said = addPageProperty(worldIn({}), { ...TEXT, partOf: "akasha/gone.quoin.ts" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page, so nothing names the property")
})

test("no rung beneath is reached", () => {
  const seen: string[] = []

  const said = addPageProperty(worldIn({ seen }), TEXT)

  expect(said.refused).toBeNull()
  expect(seen).toEqual([])
})
