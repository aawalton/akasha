import { expect, test } from "bun:test"
import { type ReadoutCatalog, type ReadoutRow, readoutCatalog } from "./readout-catalog.ts"
import { groupsShortOf, membershipOf, membershipShortfall } from "./group-shortfall.ts"

// The three groups a persona's day is scored out of, as `stoplight-mean-points.ts` names them.
const SCORED_GROUPS = ["upkeep", "inboxes", "values"] as const

function rowOf(slug: string, groupSlugs: readonly string[], enabled = true): ReadoutRow {
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
    wireKey: null,
    groupSlugs,
    enabled,
  }
}

function catalogOf(
  named: readonly string[],
  rows: readonly ReadoutRow[],
  groupSlug = "upkeep"
): ReadoutCatalog {
  return {
    readouts: new Map(rows.map((one) => [one.slug, one])),
    unreadableReadouts: new Map(),
    groups: new Map([[groupSlug, "place"]]),
    groupMemberSlugs: new Map([[groupSlug, named]]),
    scales: new Map(),
    unreadableScales: new Map(),
    queries: new Map(),
    readoutTypeSlugs: ["readout"],
  }
}

test("a group whose members all stand is short of nothing", () => {
  const held = catalogOf(["a", "b"], [rowOf("a", ["upkeep"]), rowOf("b", ["upkeep"])])
  expect(groupsShortOf(["upkeep"], held)).toEqual([])
})

test("a member the group page names with no readout page behind it is refused", () => {
  const held = catalogOf(["a", "b"], [rowOf("a", ["upkeep"])])
  const why = groupsShortOf(["upkeep"], held)
  expect(why.length).toBe(1)
  expect(why[0]).toContain("`b`")
  expect(why[0]).toContain("holds 1 lights where its page names 2")
})

test("a member still standing and marked `enabled: false` is no shortfall", () => {
  const held = catalogOf(["a", "b"], [rowOf("a", ["upkeep"]), rowOf("b", ["upkeep"], false)])
  expect(groupsShortOf(["upkeep"], held)).toEqual([])
  expect(membershipOf("upkeep", held).stilled).toEqual(["b"])
})

test("a readout naming a group its page does not name is refused", () => {
  const held = catalogOf(["a"], [rowOf("a", ["upkeep"]), rowOf("c", ["upkeep"])])
  const why = groupsShortOf(["upkeep"], held)
  expect(why.length).toBe(1)
  expect(why[0]).toContain("`c`")
  expect(why[0]).toContain("nothing states it holds")
})

test("a group drawing no light at all is refused rather than counted as zero", () => {
  const held = catalogOf(["a", "b"], [rowOf("a", ["upkeep"], false), rowOf("b", ["upkeep"], false)])
  const why = membershipShortfall(membershipOf("upkeep", held))
  expect(why.some((one) => one.includes("draws no light at all"))).toBe(true)
})

test("a group page naming nothing draws no light and is refused", () => {
  const held = catalogOf([], [])
  const why = membershipShortfall(membershipOf("upkeep", held))
  expect(why.some((one) => one.includes("draws no light at all"))).toBe(true)
})

// The live check. This is the one a removed readout page turns red, and it reads the pages in the
// checkout rather than a fixture, so an ablation that takes a member away shows up here by name.
test("every group the day is scored out of holds the members its page names", () => {
  expect(groupsShortOf(SCORED_GROUPS, readoutCatalog())).toEqual([])
})
