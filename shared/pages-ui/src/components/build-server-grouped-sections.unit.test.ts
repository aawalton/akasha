import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { GROUP_NONE_KEY } from "@shared/pages-core/view/apply-grouping-shared"
import type { PageWithProperties } from "../supabase/types"
import { buildServerGroupedSections } from "./build-server-grouped-sections"

function page(id: string, title?: string): PageWithProperties {
  return {
    _id: id,
    properties: title === undefined ? {} : { title },
  }
}

function groups(
  entries: readonly (readonly [string, readonly PageWithProperties[]])[]
): ReadonlyMap<
  string,
  { pages: readonly PageWithProperties[]; canLoadMore: boolean; totalCount: number | null }
> {
  const map = new Map<
    string,
    { pages: readonly PageWithProperties[]; canLoadMore: boolean; totalCount: number | null }
  >()
  for (const [key, pages] of entries)
    map.set(key, { pages, canLoadMore: false, totalCount: pages.length })
  return map
}

const relationDef: PropertyDefinition = { id: "parent", title: "Parent", type: "relation" }

describe("buildServerGroupedSections", () => {
  test("undefined groupBy yields undefined", () => {
    expect(
      buildServerGroupedSections({
        groupByPropertyId: undefined,
        properties: [relationDef],
        pageSets: [],
        groups: groups([]),
        loadMore: () => {},
      })
    ).toBeUndefined()
  })

  test("relation group header resolves the target page title", () => {
    const target = page("tgt-1", "Tracking Page")
    const sections = buildServerGroupedSections({
      groupByPropertyId: "parent",
      properties: [relationDef],
      pageSets: [[target]],
      groups: groups([["tgt-1", [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("Tracking Page")
  })

  test("relation group header expands an @date: title to its smart date label", () => {
    const target = page("tgt-date", "@date:2020-01-15")
    const sections = buildServerGroupedSections({
      groupByPropertyId: "parent",
      properties: [relationDef],
      pageSets: [[target]],
      groups: groups([["tgt-date", [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("15 Jan 2020")
  })

  test("unresolved relation key falls back to the raw key (no @date to expand)", () => {
    const sections = buildServerGroupedSections({
      groupByPropertyId: "parent",
      properties: [relationDef],
      pageSets: [[]],
      groups: groups([["20f5f031-8fa1-44d2-be3a-561b457548f1", [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("20f5f031-8fa1-44d2-be3a-561b457548f1")
  })

  test('empty relation group key labels as "No Value" (key untouched)', () => {
    const sections = buildServerGroupedSections({
      groupByPropertyId: "parent",
      properties: [relationDef],
      pageSets: [[]],
      groups: groups([[GROUP_NONE_KEY, [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("No Value")
    expect(sections?.[0]?.key).toBe(GROUP_NONE_KEY)
  })

  test('empty select group key labels as "No Value"; real option labels unaffected', () => {
    const selectDef: PropertyDefinition = {
      id: "status",
      title: "Status",
      type: "select",
      config: { options: [{ id: "open", label: "Open" }] },
    }
    const sections = buildServerGroupedSections({
      groupByPropertyId: "status",
      properties: [selectDef],
      pageSets: [],
      groups: groups([
        ["open", [page("row-1")]],
        [GROUP_NONE_KEY, [page("row-2")]],
      ]),
      loadMore: () => {},
    })
    expect(sections?.map((s) => s.label)).toEqual(["Open", "No Value"])
  })

  test('relation target that exists with a blank title labels as "Untitled", not "No Value"', () => {
    const target = page("tgt-blank", "")
    const sections = buildServerGroupedSections({
      groupByPropertyId: "parent",
      properties: [relationDef],
      pageSets: [[target]],
      groups: groups([["tgt-blank", [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("Untitled")
  })

  test('relation target that exists with no title property labels as "Untitled", not the raw uuid', () => {
    const target = page("tgt-untitled")
    const sections = buildServerGroupedSections({
      groupByPropertyId: "parent",
      properties: [relationDef],
      pageSets: [[target]],
      groups: groups([["tgt-untitled", [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("Untitled")
  })

  test('empty group key with no matching definition labels as "No Value"', () => {
    const sections = buildServerGroupedSections({
      groupByPropertyId: "ghost-property",
      properties: [relationDef],
      pageSets: [],
      groups: groups([[GROUP_NONE_KEY, [page("row-1")]]]),
      loadMore: () => {},
    })
    expect(sections?.[0]?.label).toBe("No Value")
  })
})
