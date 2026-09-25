import { expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { addPageProperty } from "akasha/change/mechanical/page-property/add-page-property/add-page-property.change-mechanical.code.ts"
import { pathsIn, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Reaching, World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Adding,
  bodyAnswered,
  WRITING,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const WOLD_AT = "akasha/wold/wold.text-property.ts"

const FLAG_AT = "akasha/flag/flag.boolean-property.ts"

const TYPE_AT = "akasha/quoin.page-type.ts"

const ONE_AT = "akasha/one/one.quoin.ts"

const TWO_AT = "akasha/two/two.quoin.ts"

const HAD_AT = "akasha/had/had.text-property.ts"

const WOLD = "text-property/wold"

const ADD_FILE_OF_ANY_KIND = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const STATED_ID = /id: "[^"]*", /

const PAGE_TYPES: ReadonlySet<string> = new Set([
  "boolean-property",
  "page-type",
  "quoin",
  "text-property",
])

const NO_SHAPES: ReadonlySet<string> = new Set()

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
  type: "page-type/quoin",
  slug: "one",
  note: "kept",
} as const
`

const TWO_BODY = `export const two = {
  id: "two",
  type: "page-type/quoin",
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
  [TYPE_AT]: { id: "quoin-id", type: `${pageType.slug}/${pageType.slug}`, slug: "quoin" },
  [ONE_AT]: { id: "one", type: "page-type/quoin", slug: "one", note: "kept" },
  [TWO_AT]: { id: "two", type: "page-type/quoin", slug: "two", note: "kept" },
}

const UNDER: Readonly<Record<string, readonly string[]>> = {
  "page-property": ["text-property", "boolean-property"],
}

const PAGED: readonly (readonly [string, Value])[] = [
  [ONE_AT, VALUES[ONE_AT] as Value],
  [TWO_AT, VALUES[TWO_AT] as Value],
]

function adding(seen: string[], through: boolean): Reaching {
  return async (world, at, given) => {
    seen.push(at)
    if (through && at === ADD_FILE_OF_ANY_KIND) return await WRITING(world, at, given)
    const asked = given as Adding
    return stating([{ kind: "add", path: asked.at, content: asked.body }])
  }
}

type Making = {
  readonly seen?: string[]
  readonly reads?: Map<string, number>
  readonly through?: boolean
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
      pageTypesIn: () => PAGE_TYPES,
      entryShapesAt: () => NO_SHAPES,
    } as never,
    reaching: adding(made.seen ?? [], made.through ?? false),
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

test("the property's own page is written whole at the path handed in", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, TEXT)

  expect(said.refused).toBeNull()
  expect(bodyAnswered(said, world, WOLD_AT).replace(STATED_ID, "")).toBe(WOLD_BODY)
})

test("the property's own page is handed to the change writing a file of any kind", async () => {
  const seen: string[] = []

  const said = await addPageProperty(worldIn({ seen }), TEXT)

  expect(said.refused).toBeNull()
  expect(seen[0]).toBe(ADD_FILE_OF_ANY_KIND)
})

test("a body stating no id arrives without one, for the landing to mint", async () => {
  const world = worldIn({ through: true })

  const said = await addPageProperty(world, TEXT)

  expect(WOLD_BODY).not.toMatch(/id:/)
  expect(bodyAnswered(said, world, WOLD_AT)).not.toMatch(/id:/)
})

test("the declaration goes into the properties of every page type handed in", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, TYPE_AT)).toContain(
    `{ pageProperty: "${WOLD}", required: true, many: false, default: "held" }`
  )
})

test("the property is named among the parts of the one page handed in for that", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, TYPE_AT)).toContain(`"text-property/zebra", "${WOLD}"`)
})

test("the key is put on every page of those page types, holding that default", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, ONE_AT)).toContain('wold: "held"')
  expect(bodyAnswered(said, world, TWO_AT)).toContain('wold: "held"')
})

test("the key is written last on every page, since no page writes it yet", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, TEXT)

  expect(bodyAnswered(said, world, ONE_AT)).toContain('note: "kept",\n  wold: "held"')
})

test("one body is read once however many passages it gains", async () => {
  const reads = new Map<string, number>()

  await addPageProperty(worldIn({ reads }), TEXT)

  expect(reads.get(TYPE_AT)).toBe(1)
})

test("no page gains the key where the caller states no default", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, required: false, default: undefined })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).not.toContain(ONE_AT)
})

test("a declaration holding many values states a count, and that count is nothing", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, { ...TEXT, many: true, default: undefined })

  expect(bodyAnswered(said, world, TYPE_AT)).toContain(
    `{ pageProperty: "${WOLD}", required: true, many: true, maxCount: null }`
  )
})

test("a declaration holding many values is refused a default", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, many: true })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("a declaration holding many states no default")
})

test("a default is spelled as its own kind on the declaration and on a page", async () => {
  const world = worldIn({})

  const said = await addPageProperty(world, {
    ...TEXT,
    at: FLAG_AT,
    body: FLAG_BODY,
    default: "true",
  })

  expect(bodyAnswered(said, world, TYPE_AT)).toContain("default: true }")
  expect(bodyAnswered(said, world, ONE_AT)).toContain("flag: true")
})

test("a default the property's kind cannot hold is refused", async () => {
  const said = await addPageProperty(worldIn({}), {
    ...TEXT,
    at: FLAG_AT,
    body: FLAG_BODY,
    default: "yes",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`yes` is no boolean, so `boolean-property/flag` holds it nowhere")
})

test("a path naming no page type a page property is is refused", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, at: "akasha/wold/wold.quoin.ts" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`quoin` names no page type a page property is")
})

test("a path already holding a body is refused rather than written over", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, at: HAD_AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds a body already")
})

test("a body stating no property slug is refused", async () => {
  const said = await addPageProperty(worldIn({}), {
    ...TEXT,
    body: "export const wold = {} as const\n",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("states no `propertySlug`")
})

test("a body exporting no object is refused", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, body: "export const wold = 1\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("exports no object")
})

test("a call naming no page type is refused", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, on: [] })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no page type declares \`${WOLD}\`, so no page would carry it`)
})

test("a path naming no page type is refused", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, on: [ONE_AT] })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page type, so nothing declares the property")
})

test("a page naming nothing among its parts is refused", async () => {
  const said = await addPageProperty(worldIn({}), { ...TEXT, partOf: "akasha/gone.quoin.ts" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page, so nothing names the property")
})
