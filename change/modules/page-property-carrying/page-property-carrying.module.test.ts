import { expect, test } from "bun:test"
import {
  carriedUnder,
  type Declared,
  entriesBeside,
  filedUnder,
  typesDeclaring,
  withinOf,
} from "akasha/change/modules/page-property-carrying/page-property-carrying.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const ONE_AT = "akasha/one/one.quoin.ts"

const TWO_AT = "akasha/two/two.quoin.ts"

const TALLIES_AT = "akasha/tallies.record-property.ts"

const ROWS_AT = "akasha/months/one.month.tallies.jsonl"

const PART_TWO_AT = "akasha/months/one.month.tallies.part2.jsonl"

const UNCOMMITTED_AT = "akasha/months/one.month.tallies.uncommitted.jsonl"

const MONTH_AT = "akasha/months/one.month.ts"

const SHAPE_AT = "akasha/tallies.page-property-entry.ts"

const ONE: Value = { id: "one", type: "page-type/quoin", slug: "one", wold: "held" }

const TWO: Value = { id: "two", type: "page-type/quoin", slug: "two" }

const MONTH: Value = { id: "month-one", type: "page-type/month", slug: "one", tallies: "jsonl" }

const TALLIES: Value = {
  id: "tallies-id",
  type: `${pageType.slug}/record-property`,
  slug: "tallies",
  propertySlug: "tallies",
}

const SHAPE: Value = {
  id: "shape-id",
  type: `${pageType.slug}/page-property-entry`,
  slug: "tallies",
  propertySlug: "tallies",
}

const RECORD: Declared = {
  slug: "tallies",
  kind: "record-property",
  id: "tallies-id",
  path: TALLIES_AT,
}

const SHAPED: Declared = {
  slug: "tallies",
  kind: "page-property-entry",
  id: "shape-id",
  path: SHAPE_AT,
}

const BY_A_TYPE: readonly Declared[] = [
  { slug: "quoin", kind: "page-type", id: "quoin-id", path: "akasha/quoin.page-type.ts" },
]

const BY_A_MONTH: readonly Declared[] = [
  { slug: "month", kind: "page-type", id: "month-id", path: "akasha/month.page-type.ts" },
]

type Making = {
  readonly bodies: Readonly<Record<string, string>>
  readonly values: Readonly<Record<string, Value>>
  readonly declaring: readonly Declared[]
  readonly paged: Readonly<Record<string, readonly (readonly [string, Value])[]>>
}

function worldIn(made: Making): World {
  return {
    ...worldOf(made.bodies),
    index: {
      pageByPath: (at: string) => made.values[at] ?? null,
      declaringOf: () => made.declaring,
      kindsUnder: (slug: string) => new Set([slug]),
      valuesByPath: (slug: string) => new Map(made.paged[slug] ?? []),
    } as never,
  }
}

function quoinWorld(): World {
  return worldIn({
    bodies: {},
    values: { [TALLIES_AT]: TALLIES },
    declaring: BY_A_TYPE,
    paged: {
      quoin: [
        [ONE_AT, ONE],
        [TWO_AT, TWO],
      ],
    },
  })
}

test("a page stating a value under the key is answered with that value", () => {
  const said = carriedUnder(quoinWorld(), ["quoin"], "wold", null)

  expect(said).toEqual([{ path: ONE_AT, held: "held" }])
})

test("a page stating no value under the key is left out", () => {
  const said = carriedUnder(quoinWorld(), ["quoin"], "wold", null)

  expect(said.map((one) => one.path)).not.toContain(TWO_AT)
})

test("a page reached under two page types is answered once", () => {
  const said = carriedUnder(quoinWorld(), ["quoin", "quoin"], "wold", null)

  expect(said).toHaveLength(1)
})

test("a count handed in holds how many pages are answered", () => {
  const world = worldIn({
    bodies: {},
    values: {},
    declaring: BY_A_TYPE,
    paged: {
      quoin: [
        [ONE_AT, ONE],
        [TWO_AT, { id: "two", type: "page-type/quoin", slug: "two", wold: "kept" }],
      ],
    },
  })

  expect(carriedUnder(world, ["quoin"], "wold", 1)).toHaveLength(1)
})

test("only the page types declaring a property are answered", () => {
  const said = typesDeclaring(quoinWorld(), "tallies-id")

  expect(said).toEqual(["quoin"])
})

test("a declarer that is no page type is left out", () => {
  const world = worldIn({ bodies: {}, values: {}, declaring: [SHAPED], paged: {} })

  expect(typesDeclaring(world, "tallies-id")).toEqual([])
})

test("the key a record property's records sit under is the slug its page states", () => {
  const said = withinOf(quoinWorld(), RECORD, null)

  expect(said?.key).toBe("tallies")
})

test("the pages stating those records are the pages of every declaring page type", () => {
  const world = worldIn({
    bodies: {},
    values: { [TALLIES_AT]: TALLIES },
    declaring: BY_A_TYPE,
    paged: { quoin: [[ONE_AT, { id: "one", type: "page-type/quoin", slug: "one", tallies: [] }]] },
  })

  expect(withinOf(world, RECORD, null)?.carrying).toEqual([ONE_AT])
})

test("a record property whose page states no property slug answers nothing", () => {
  const world = worldIn({ bodies: {}, values: {}, declaring: BY_A_TYPE, paged: {} })

  expect(withinOf(world, RECORD, null)).toBeNull()
})

function shapeWorld(bodies: Readonly<Record<string, string>>): World {
  return worldIn({
    bodies,
    values: { [SHAPE_AT]: SHAPE },
    declaring: BY_A_MONTH,
    paged: { month: [[MONTH_AT, MONTH]] },
  })
}

test("the files of entries under a shape are the files beside every page stating its key", () => {
  const said = filedUnder(shapeWorld({ [ROWS_AT]: '{"id":"a"}\n' }), SHAPED)

  expect(said).toEqual([ROWS_AT])
})

test("a file the world holds no body for is left out", () => {
  const said = filedUnder(shapeWorld({}), SHAPED)

  expect(said).toEqual([])
})

test("a shape whose page states no property slug reaches no file", () => {
  const world = worldIn({ bodies: {}, values: {}, declaring: BY_A_MONTH, paged: {} })

  expect(filedUnder(world, SHAPED)).toEqual([])
})

test("the entry files beside one page are the files that page's own value names", () => {
  const world = shapeWorld({ [ROWS_AT]: '{"id":"a"}\n' })

  expect(entriesBeside(world, MONTH_AT, "jsonl", "tallies")).toEqual([ROWS_AT])
})

test("a second part beside that page is answered after the first", () => {
  const world = shapeWorld({ [ROWS_AT]: '{"id":"a"}\n', [PART_TWO_AT]: '{"id":"b"}\n' })

  expect(entriesBeside(world, MONTH_AT, "jsonl", "tallies")).toEqual([ROWS_AT, PART_TWO_AT])
})

test("the files beside one page are the uncommitted files where the call says so", () => {
  const world = shapeWorld({ [ROWS_AT]: '{"id":"a"}\n', [UNCOMMITTED_AT]: '{"id":"b"}\n' })

  expect(entriesBeside(world, MONTH_AT, "jsonl", "tallies", true)).toEqual([UNCOMMITTED_AT])
})

test("a file beside one page the world holds no body for is left out", () => {
  expect(entriesBeside(shapeWorld({}), MONTH_AT, "jsonl", "tallies")).toEqual([])
})

test("a page whose value under that key is no string is beside no file", () => {
  const world = shapeWorld({ [ROWS_AT]: '{"id":"a"}\n' })

  expect(entriesBeside(world, MONTH_AT, [], "tallies")).toEqual([])
})
