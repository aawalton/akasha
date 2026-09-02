import { expect, test } from "bun:test"
import { type ReadoutCatalog, type ReadoutRow, readoutCatalog } from "./readout-catalog.ts"
import {
  type AkashaReadout,
  akashaReadouts,
  divergenceIn,
  groupsDivergentIn,
  sidesOf,
} from "./group-divergence.ts"

// The three groups a persona's day is scored out of, as `stoplight-mean-points.ts` names them.
const SCORED_GROUPS = ["upkeep", "inboxes", "values"] as const

const GROUP = "upkeep"

function rowOf(
  slug: string,
  groupSlugs: readonly string[],
  enabled = true,
  wireKey: string | null = null
): ReadoutRow {
  return {
    slug,
    title: null,
    label: slug,
    unit: null,
    place: null,
    scaleSlug: "green-day-units",
    querySlug: null,
    queryKey: null,
    queryArgument: null,
    earnedKey: null,
    wireKey,
    groupSlugs,
    enabled,
  }
}

function catalogOf(rows: readonly ReadoutRow[]): ReadoutCatalog {
  return {
    readouts: new Map(rows.map((one) => [one.slug, one])),
    unreadableReadouts: new Map(),
    groups: new Map([[GROUP, "place"]]),
    groupMemberSlugs: new Map([[GROUP, rows.map((one) => one.slug)]]),
    scales: new Map(),
    unreadableScales: new Map(),
    queries: new Map(),
    readoutTypeSlugs: ["readout"],
  }
}

function akashaOf(
  named: readonly (readonly [string, readonly string[], string | null])[]
): ReadonlyMap<string, AkashaReadout> {
  return new Map(
    named.map(([slug, groupSlugs, wireKey]) => [
      slug,
      { slug, label: slug, place: null, scaleSlug: "green-day-units", wireKey, groupSlugs },
    ])
  )
}

test("a group both engines answer the same way diverges in nothing", () => {
  const catalog = catalogOf([rowOf("a", [GROUP]), rowOf("b", [GROUP])])
  const akasha = akashaOf([
    ["a", [GROUP], null],
    ["b", [GROUP], null],
  ])
  expect(groupsDivergentIn([GROUP], catalog, akasha)).toEqual([])
})

// THE SEEDED FAULT THIS EXISTS FOR. A readout removed on the akasha side while its markdown twin
// stands is exactly the shape that ran undetected: the wire answered the smaller strip and the
// status bar went on drawing the larger one.
test("a member drawn out of markdown that the akasha index does not hold is refused", () => {
  const catalog = catalogOf([rowOf("a", [GROUP]), rowOf("b", [GROUP])])
  const akasha = akashaOf([["a", [GROUP], null]])
  const why = groupsDivergentIn([GROUP], catalog, akasha)
  expect(why.length).toBe(1)
  expect(why[0]).toContain("`b`")
  expect(why[0]).toContain("2 lights through one engine and 1 through the other")
})

test("a member the akasha index holds that no markdown readout draws is refused", () => {
  const catalog = catalogOf([rowOf("a", [GROUP])])
  const akasha = akashaOf([
    ["a", [GROUP], null],
    ["c", [GROUP], null],
  ])
  const why = groupsDivergentIn([GROUP], catalog, akasha)
  expect(why.length).toBe(1)
  expect(why[0]).toContain("`c`")
  expect(why[0]).toContain("does not know is there")
})

// A stilled markdown page is not a member. Alan ruled an ablated readout's page stays and is
// marked, so `enabled: false` beside an akasha side that never held it is a finished ablation
// rather than a divergence.
test("a markdown member marked `enabled: false` is no divergence", () => {
  const catalog = catalogOf([rowOf("a", [GROUP]), rowOf("b", [GROUP], false)])
  const akasha = akashaOf([["a", [GROUP], null]])
  expect(groupsDivergentIn([GROUP], catalog, akasha)).toEqual([])
})

test("a group the akasha index knows nothing of is named as unmigrated rather than as drift", () => {
  const catalog = catalogOf([rowOf("a", [GROUP]), rowOf("b", [GROUP])])
  const why = groupsDivergentIn([GROUP], catalog, akashaOf([]))
  expect(why.length).toBe(1)
  expect(why[0]).toContain("has not been migrated")
  expect(why[0]).toContain("empty strip")
})

test("one reading spelled two ways is reported as a rename rather than as two members lost", () => {
  const catalog = catalogOf([rowOf("here", [GROUP], true, "wire")])
  const akasha = akashaOf([["there", [GROUP], "wire"]])
  const sides = sidesOf(GROUP, catalog, akasha)
  expect(sides.markdownOnly).toEqual([])
  expect(sides.akashaOnly).toEqual([])
  expect(sides.renamed).toEqual([["here", "there"]])
  const why = divergenceIn(sides)
  expect(why.length).toBe(1)
  expect(why[0]).toContain("spells one reading `here` in markdown and `there`")
})

test("two readings sharing no wire key are two members lost rather than a rename", () => {
  const catalog = catalogOf([rowOf("here", [GROUP], true, "one")])
  const akasha = akashaOf([["there", [GROUP], "two"]])
  const sides = sidesOf(GROUP, catalog, akasha)
  expect(sides.renamed).toEqual([])
  expect(sides.markdownOnly).toEqual(["here"])
  expect(sides.akashaOnly).toEqual(["there"])
})

// THE INSTRUMENT PROVES ITSELF ON LIVE DATA BEFORE ANY CLEAN READING IS BELIEVED.
//
// `claude-usage` is drawn out of markdown by four readouts and the akasha index holds none of
// them. If this went green the check could not see its subject, and every other live reading here
// would be a false negative wearing the same string as a true one.
test("the live check sees the divergence that is really standing in `claude-usage`", () => {
  const why = groupsDivergentIn(["claude-usage"], readoutCatalog(), akashaReadouts())
  expect(why.length).toBeGreaterThan(0)
  expect(why[0]).toContain("has not been migrated")
})

// THE LIVE CHECK. Read against the checkout and the index rather than a fixture, so an ablation
// that takes a member from one side and not the other shows up here by name.
test("every group the day is scored out of is the same group through both engines", () => {
  expect(groupsDivergentIn(SCORED_GROUPS, readoutCatalog(), akashaReadouts())).toEqual([])
})
