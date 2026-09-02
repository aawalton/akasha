import { expect, test } from "bun:test"
import { type ReadoutCatalog, type ReadoutRow, readoutCatalog } from "./readout-catalog.ts"
import {
  type AkashaReadout,
  akashaReadouts,
  divergenceIn,
  groupsDivergentIn,
  sidesOf,
} from "./group-divergence.ts"

// The groups Alan's harness draws through both engines.
//
// `values` stood here while `stoplight-mean-points.ts` scored a day out of it. Alan ruled the six
// values pages stay and the points and stoplights for values go, so that file and the akasha values
// readouts were ablated. The six `alan/value/*.value.md` he kept are readout rows in markdown, by
// `pages/page-type/value.page-type.md` extending `readout`, and they now have no akasha counterpart
// on purpose. Naming `values` here would report that deliberate absence as a migration that stalled.
const MIRRORED_GROUPS = ["upkeep", "inboxes"] as const

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
  named: readonly (readonly [string, readonly string[], string | null, boolean?])[]
): ReadonlyMap<string, AkashaReadout> {
  return new Map(
    named.map(([slug, groupSlugs, wireKey, enabled = true]) => [
      slug,
      {
        slug,
        label: slug,
        place: null,
        scaleSlug: "green-day-units",
        wireKey,
        groupSlugs,
        enabled,
      },
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

// The akasha side carries `enabled` too, since `readout-enabled` was declared on the page type.
// `inboxes-texts` landed stilled on both sides, and while this read only the markdown side's
// property it called that page a light reaching the wire. A stilled member is no member either side.
test("an akasha member marked `enabled: false` is no divergence", () => {
  const catalog = catalogOf([rowOf("a", [GROUP]), rowOf("b", [GROUP], false)])
  const akasha = akashaOf([
    ["a", [GROUP], null],
    ["b", [GROUP], null, false],
  ])
  expect(groupsDivergentIn([GROUP], catalog, akasha)).toEqual([])
})

// THE SEEDED FAULT FOR THE LINE ABOVE. Stilled on the akasha side alone is still a divergence,
// so the check above passes because both sides agree rather than because nothing is compared.
test("a member stilled on the akasha side alone is refused", () => {
  const catalog = catalogOf([rowOf("a", [GROUP]), rowOf("b", [GROUP])])
  const akasha = akashaOf([
    ["a", [GROUP], null],
    ["b", [GROUP], null, false],
  ])
  const why = groupsDivergentIn([GROUP], catalog, akasha)
  expect(why.length).toBe(1)
  expect(why[0]).toContain("`b`")
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
// This used to name `claude-usage`, which markdown drew and the akasha index did not hold at all.
// That gap is closed, and closing it took the proof down with it: the test went red for the one
// reason a test here must never go red — the tree got better. A self-proof resting on a real gap
// expires the moment the gap does, and what it leaves behind is a live check nothing vouches for.
//
// So the fault is seeded into live data rather than borrowed from it. The catalog and the index
// are the real ones; one member is taken off the akasha side before the comparison. A false
// negative and a true negative are the same empty list, and this is what tells the two apart.
test("the live check still sees a member taken off the akasha side", () => {
  const catalog = readoutCatalog()
  const maimed = new Map(akashaReadouts())
  const [taken] = [...maimed.keys()].filter((slug) =>
    maimed.get(slug)?.groupSlugs.includes("upkeep")
  )
  expect(taken).toBeDefined()
  maimed.delete(taken as string)
  const why = groupsDivergentIn(["upkeep"], catalog, maimed)
  expect(why.length).toBeGreaterThan(0)
  expect(why[0]).toContain(`\`${taken}\``)
})

// THE LIVE CHECK. Read against the checkout and the index rather than a fixture, so an ablation
// that takes a member from one side and not the other shows up here by name.
test("every group Alan's harness draws is the same group through both engines", () => {
  expect(groupsDivergentIn(MIRRORED_GROUPS, readoutCatalog(), akashaReadouts())).toEqual([])
})
