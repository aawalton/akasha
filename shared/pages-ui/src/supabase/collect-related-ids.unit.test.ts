import { describe, expect, it } from "bun:test"
import { collectRelatedIds, type RelationSpec } from "./collect-related-ids"

describe("collectRelatedIds", () => {
  const specs: readonly RelationSpec[] = [
    { propertyId: "rewardConcepts", targetPageTypeSlug: "concept" },
    { propertyId: "value", targetPageTypeSlug: "value" },
  ]

  function personas(
    count: number,
    conceptsPerRow: number
  ): readonly { properties: Record<string, unknown> }[] {
    return Array.from({ length: count }, (_, r) => ({
      properties: {
        rewardConcepts: Array.from({ length: conceptsPerRow }, (_, i) => `rc-${r}-${i}`),
        value: `value-${r}`,
      },
    }))
  }

  function idsUnder(
    groups: readonly { pageTypeSlug: string; ids: readonly string[] }[],
    slug: string
  ): readonly string[] {
    return groups.find((g) => g.pageTypeSlug === slug)?.ids ?? []
  }

  it("collects every row's single-relation target despite a preceding high-cardinality relation", () => {
    const groups = collectRelatedIds(personas(6, 50), specs, 100)
    for (let r = 0; r < 6; r++) {
      expect(idsUnder(groups, "value")).toContain(`value-${r}`)
    }
  })

  it("caps each property independently rather than sharing one budget", () => {
    const cap = 10
    const groups = collectRelatedIds(personas(1, 50), specs, cap)
    expect(idsUnder(groups, "concept").length).toBe(cap)
    expect(idsUnder(groups, "value")).toContain("value-0")
  })

  it("returns each group deduped and sorted, so the cache key is stable", () => {
    const groups = collectRelatedIds(personas(2, 2), specs, 100)
    for (const group of groups) {
      expect(group.ids).toEqual([...group.ids].sort())
      expect(new Set(group.ids).size).toBe(group.ids.length)
    }
    expect(groups.map((g) => g.pageTypeSlug)).toEqual([...groups.map((g) => g.pageTypeSlug)].sort())
  })

  it("sorts each relation's values under the page type that relation points at", () => {
    const rows = [{ properties: { story: "story-abc", tags: ["t-1", "t-2"] } }]
    const groups = collectRelatedIds(
      rows,
      [
        { propertyId: "story", targetPageTypeSlug: "story" },
        { propertyId: "tags", targetPageTypeSlug: "tag" },
      ],
      100
    )
    expect(groups).toEqual([
      { pageTypeSlug: "story", ids: ["story-abc"] },
      { pageTypeSlug: "tag", ids: ["t-1", "t-2"] },
    ])
  })

  it("gathers two relations pointing at one page type into a single group", () => {
    const rows = [{ properties: { owner: "d-1", parent: "d-2" } }]
    const groups = collectRelatedIds(
      rows,
      [
        { propertyId: "owner", targetPageTypeSlug: "domain" },
        { propertyId: "parent", targetPageTypeSlug: "domain" },
      ],
      100
    )
    expect(groups).toEqual([{ pageTypeSlug: "domain", ids: ["d-1", "d-2"] }])
  })
})
