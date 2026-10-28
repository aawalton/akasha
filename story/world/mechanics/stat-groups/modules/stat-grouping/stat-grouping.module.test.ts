import { expect, test } from "bun:test"
import {
  statGroupSlugsIn,
  statGroupsOf,
} from "akasha/story/world/mechanics/stat-groups/modules/stat-grouping/stat-grouping.module.code.ts"

const BASIC = "world-stat-group/basic"

const ADVANCED = "world-stat-group/advanced"

const GROUPS = [
  { slug: "affinities", title: "Affinities", displayOrder: 3 },
  {
    slug: "advanced",
    title: "Advanced Attribute",
    pluralTitle: "Advanced Attributes",
    statSlots: 2,
    displayOrder: 2,
  },
  { slug: "basic", title: "Basic Attributes", displayOrder: 1 },
]

function stat(name: string, group?: string): { values: Record<string, unknown> } {
  return { values: { name, ...(group === undefined ? {} : { statGroup: group }) } }
}

function namesOf(rows: readonly { values: Record<string, unknown> }[]): readonly string[] {
  return rows.map((one) => String(one.values["name"]))
}

test("stats are gathered under their groups in display order, with slots counted", () => {
  const stats = [stat("STRENGTH", BASIC), stat("MENTAL", BASIC), stat("TALENTED", ADVANCED)]
  expect(statGroupsOf(stats, GROUPS, namesOf)).toEqual([
    { title: "Basic Attributes", names: ["STRENGTH", "MENTAL"] },
    { title: "Advanced Attributes", names: ["TALENTED"], count: "1/2" },
  ])
})

test("a group holding no stat shown is left out, and a stat naming no group stays loose", () => {
  const stats = [stat("STRENGTH", BASIC), stat("LUCK")]
  expect(statGroupsOf(stats, GROUPS, namesOf)).toEqual([
    { title: "Basic Attributes", names: ["STRENGTH"] },
  ])
  expect(statGroupSlugsIn(stats)).toEqual(["basic"])
  expect(statGroupsOf([stat("LUCK")], [], namesOf)).toEqual([])
})
