import { expect, test } from "bun:test"
import { removePageProperty } from "akasha/changes/mechanical/page-property/remove/remove-page-property/remove-page-property.change-mechanical.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const WOLD_AT = "akasha/wold/wold.text-property.ts"

const TYPE_AT = "akasha/quoin.page-type.ts"

const ONE_AT = "akasha/one/one.quoin.ts"

const TWO_AT = "akasha/two/two.quoin.ts"

const WOLD = "text-property/wold"

const QUOIN = "page-type/quoin"

const FILE_WOLD = "file-property/wold"

const FILE_WOLD_AT = "akasha/wold/wold.file-property.ts"

const FILE_WOLD_TYPES_AT = "akasha/wold/wold.file-property.types.ts"

const ONE_FILE_AT = "akasha/one/one.quoin.wold.ts"

const WOLD_BODY = `export const wold = {
  id: "wold-id",
  type: "text-property",
  slug: "wold",
  propertySlug: "wold",
} as const
`

const FILE_WOLD_BODY = `export const wold = {
  id: "wold-id",
  type: "file-property",
  slug: "wold",
  propertySlug: "wold",
  types: "ts",
} as const
`

const TYPE_BODY = `export const quoin = {
  id: "quoin-id",
  type: "page-type",
  slug: "quoin",
  parts: ["text-property/note", "text-property/wold"],
  properties: [
    { pageProperty: "text-property/note", required: false, many: false },
    { pageProperty: "text-property/wold", required: false, many: false },
  ],
} as const
`

const ONE_BODY = `export const one = {
  id: "one",
  pageTypeSlug: "quoin",
  slug: "one",
  note: "kept",
  wold: "held",
} as const
`

const TWO_BODY = `export const two = {
  id: "two",
  pageTypeSlug: "quoin",
  slug: "two",
  note: "kept",
} as const
`

const ONE_FILED_BODY = `export const one = {
  id: "one",
  pageTypeSlug: "quoin",
  slug: "one",
  wold: "ts",
} as const
`

const BODIES: Readonly<Record<string, string>> = {
  [WOLD_AT]: WOLD_BODY,
  [TYPE_AT]: TYPE_BODY,
  [ONE_AT]: ONE_BODY,
  [TWO_AT]: TWO_BODY,
}

const VALUES: Readonly<Record<string, Value>> = {
  [WOLD_AT]: { id: "wold-id", pageTypeSlug: "text-property", slug: "wold", propertySlug: "wold" },
  [TYPE_AT]: { id: "quoin-id", pageTypeSlug: "page-type", slug: "quoin" },
  [ONE_AT]: { id: "one", pageTypeSlug: "quoin", slug: "one", note: "kept", wold: "held" },
  [TWO_AT]: { id: "two", pageTypeSlug: "quoin", slug: "two", note: "kept" },
}

type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

const BY_A_TYPE: readonly Declaring[] = [
  { slug: "quoin", kind: "page-type", id: "quoin-id", path: TYPE_AT },
]

const BY_A_RECORD: readonly Declaring[] = [
  {
    slug: "tallies",
    kind: "record-property",
    id: "tallies-id",
    path: "akasha/i.record-property.ts",
  },
]

type Namer = { readonly path: string; readonly propertySlug: string }

const NAMERS: readonly Namer[] = [{ path: TYPE_AT, propertySlug: "parts" }]

const NO_FILES: ReadonlyMap<string, ReadonlyMap<string, string | null>> = new Map()

type Making = {
  readonly bodies: Readonly<Record<string, string>>
  readonly values: Readonly<Record<string, Value>>
  readonly declaring: readonly Declaring[]
  readonly paged: readonly (readonly [string, Value])[]
  readonly files?: ReadonlyMap<string, ReadonlyMap<string, string | null>>
  readonly seen?: string[]
  readonly reads?: Map<string, number>
}

function worldIn(made: Making): World {
  const held = worldOf(made.bodies)
  const reads = made.reads ?? new Map<string, number>()
  return {
    ...held,
    textOf: (path) => {
      reads.set(path, (reads.get(path) ?? 0) + 1)
      return held.textOf(path)
    },
    index: {
      pageByPath: (at: string) => made.values[at] ?? null,
      listedAt: (pageTypeSlug: string, slug: string) => {
        const found = Object.entries(made.values).find(
          ([, value]) => value["pageTypeSlug"] === pageTypeSlug && value["slug"] === slug
        )
        return found === undefined ? [] : [{ path: found[0], id: found[1]["id"] }]
      },
      listedByPath: (path: string) => {
        const value = made.values[path]
        return value === undefined ? [] : [{ path, id: value["id"] }]
      },
      namersOf: () => NAMERS,
      declaringOf: () => made.declaring,
      kindsUnder: (slug: string) => new Set([slug]),
      valuesByPath: () => new Map(made.paged),
      filePropertiesAt: () => made.files ?? NO_FILES,
      sidecarsAt: () => new Map(),
      uncommittedFiledAt: () => new Map(),
      everyPath: () => Object.keys(made.bodies),
    } as never,
    reaching: listing(made.seen ?? []),
  }
}

const PAGED: readonly (readonly [string, Value])[] = [
  [ONE_AT, VALUES[ONE_AT] as Value],
  [TWO_AT, VALUES[TWO_AT] as Value],
]

function textWorld(seen: string[] = [], reads: Map<string, number> = new Map()): World {
  return worldIn({
    bodies: BODIES,
    values: VALUES,
    declaring: BY_A_TYPE,
    paged: PAGED,
    seen,
    reads,
  })
}

test("the key goes off every page carrying it", () => {
  const world = textWorld()

  const said = removePageProperty(world, { property: WOLD })

  expect(bodyAnswered(said, world, ONE_AT)).not.toContain("wold")
  expect(bodyAnswered(said, world, ONE_AT)).toContain('note: "kept"')
})

test("a page stating no value under that key is passed over", () => {
  const said = removePageProperty(textWorld(), { property: WOLD })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).not.toContain(TWO_AT)
})

test("the declaration goes off the properties of every page type declaring it", () => {
  const world = textWorld()

  const said = removePageProperty(world, { property: WOLD })

  expect(bodyAnswered(said, world, TYPE_AT)).not.toContain(WOLD)
  expect(bodyAnswered(said, world, TYPE_AT)).toContain('pageProperty: "text-property/note"')
})

test("the entry goes off the parts of every page naming it", () => {
  const world = textWorld()

  const said = removePageProperty(world, { property: WOLD })

  expect(bodyAnswered(said, world, TYPE_AT)).toContain('parts: ["text-property/note"]')
})

test("one body is read once however many passages of it go", () => {
  const reads = new Map<string, number>()

  removePageProperty(textWorld([], reads), { property: WOLD })

  expect(reads.get(TYPE_AT)).toBe(1)
})

test("the property's own page goes", () => {
  const said = removePageProperty(textWorld(), { property: WOLD })

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({ kind: "remove", path: WOLD_AT })
})

test("a property no page type declares has its page taken away all the same", () => {
  const world = worldIn({ bodies: BODIES, values: VALUES, declaring: [], paged: PAGED })

  const said = removePageProperty(world, { property: WOLD })

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({ kind: "remove", path: WOLD_AT })
})

test("an address naming no page property is refused", () => {
  const said = removePageProperty(textWorld(), { property: "text-property/gone" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`text-property/gone` names no page property, so no property is taken away"
  )
})

test("a page stating no property slug names no page property", () => {
  const said = removePageProperty(textWorld(), { property: QUOIN })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`page-type/quoin` names no page property, so no property is taken away"
  )
})

test("a property a record property declares is refused", () => {
  const world = worldIn({
    bodies: BODIES,
    values: VALUES,
    declaring: [...BY_A_TYPE, ...BY_A_RECORD],
    paged: PAGED,
  })

  const said = removePageProperty(world, { property: WOLD })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is declared by `record-property/tallies`")
})

test("no rung beneath is reached", () => {
  const seen: string[] = []

  const said = removePageProperty(textWorld(seen), { property: WOLD })

  expect(said.refused).toBeNull()
  expect(seen).toEqual([])
})

const FILE_VALUES: Readonly<Record<string, Value>> = {
  [FILE_WOLD_AT]: {
    id: "wold-id",
    pageTypeSlug: "file-property",
    slug: "wold",
    propertySlug: "wold",
    types: "ts",
  },
  [TYPE_AT]: { id: "quoin-id", pageTypeSlug: "page-type", slug: "quoin" },
  [ONE_AT]: { id: "one", pageTypeSlug: "quoin", slug: "one", wold: "ts" },
}

const FILE_BODIES: Readonly<Record<string, string>> = {
  [FILE_WOLD_AT]: FILE_WOLD_BODY,
  [FILE_WOLD_TYPES_AT]: "export type Wold = string\n",
  [TYPE_AT]: TYPE_BODY,
  [ONE_AT]: ONE_FILED_BODY,
  [ONE_FILE_AT]: "export const one = 1\n",
}

function fileWorld(): World {
  return worldIn({
    bodies: FILE_BODIES,
    values: FILE_VALUES,
    declaring: BY_A_TYPE,
    paged: [[ONE_AT, FILE_VALUES[ONE_AT] as Value]],
    files: new Map([["file-property", new Map([["types", null]])]]),
  })
}

test("every file the property's own page claims beside it goes", () => {
  const said = removePageProperty(fileWorld(), { property: FILE_WOLD })

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({ kind: "remove", path: FILE_WOLD_TYPES_AT })
})

test("a file property's key names a file beside each page, and that file goes with the key", () => {
  const said = removePageProperty(fileWorld(), { property: FILE_WOLD })

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({ kind: "remove", path: ONE_FILE_AT })
})

test("a body that goes has no passage spliced out of it", () => {
  const said = removePageProperty(fileWorld(), { property: FILE_WOLD })

  expect(said.edits.some((one) => one.kind === "replace" && one.path === ONE_FILE_AT)).toBe(false)
})
