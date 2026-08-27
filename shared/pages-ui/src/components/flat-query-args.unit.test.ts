import { describe, expect, test } from "bun:test"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PageTypeSlug } from "@shared/pages-url"
import { buildFlatQueryArgs } from "./flat-query-args"

const SLUG = PageTypeSlug("story-chapter")
const CHILD_PAGE_TYPE_ID = "019db5f4-063c-710f-a432-4c822d31915a"
const NO_PROPS: readonly PropertyDefinition[] = []

const RELATION_FILTERED: ViewDataJSON = {
  version: 1,
  layout: "gallery",
  filters: [
    { propertyId: "story", operator: "equals", value: "019efbd1-d641-727d-8e98-4f10ccc0cfba" },
  ],
}

const RELATION_FILTERED_OTHER: ViewDataJSON = {
  version: 1,
  layout: "gallery",
  filters: [
    { propertyId: "story", operator: "equals", value: "019f0701-aaaa-7000-8000-000000000000" },
  ],
}

describe("buildFlatQueryArgs", () => {
  test("returns full args (filter included) once the child page-type id resolves", () => {
    const args = buildFlatQueryArgs({
      groupByPropertyId: undefined,
      spanDescendants: false,
      targetPageTypeId: CHILD_PAGE_TYPE_ID,
      pageTypeSlug: SLUG,
      effectiveConfig: RELATION_FILTERED,
      properties: NO_PROPS,
    })
    expect(args).toMatchObject({
      pageTypeId: CHILD_PAGE_TYPE_ID,
      pageTypeSlug: SLUG,
      viewConfig: RELATION_FILTERED,
      properties: NO_PROPS,
    })
    expect(typeof args?.viewId).toBe("string")
    expect(args?.viewId.length ?? 0).toBeGreaterThan(0)
    expect(args?.viewUpdatedAt).toBe(args?.viewId)
  })

  test("synthetic view-key is stable for identical inputs and distinct per relation target", () => {
    const base = {
      groupByPropertyId: undefined,
      spanDescendants: false,
      targetPageTypeId: CHILD_PAGE_TYPE_ID,
      pageTypeSlug: SLUG,
      properties: NO_PROPS,
    } as const
    const a1 = buildFlatQueryArgs({ ...base, effectiveConfig: RELATION_FILTERED })
    const a2 = buildFlatQueryArgs({ ...base, effectiveConfig: RELATION_FILTERED })
    const b = buildFlatQueryArgs({ ...base, effectiveConfig: RELATION_FILTERED_OTHER })
    expect(a1?.viewId).toBe(a2?.viewId)
    expect(b?.viewId).not.toBe(a1?.viewId)
  })

  test("returns undefined while the page-type id is unresolved (regression: no relation filter against the all-zeros sentinel)", () => {
    expect(
      buildFlatQueryArgs({
        groupByPropertyId: undefined,
        spanDescendants: false,
        targetPageTypeId: "",
        pageTypeSlug: SLUG,
        effectiveConfig: RELATION_FILTERED,
        properties: NO_PROPS,
      })
    ).toBeUndefined()
  })

  test("returns undefined when grouped (the grouped query owns the fetch)", () => {
    expect(
      buildFlatQueryArgs({
        groupByPropertyId: "status",
        spanDescendants: false,
        targetPageTypeId: CHILD_PAGE_TYPE_ID,
        pageTypeSlug: SLUG,
        effectiveConfig: RELATION_FILTERED,
        properties: NO_PROPS,
      })
    ).toBeUndefined()
  })

  test("returns undefined when spanning a descendant subtree (the span path supplies merged rows)", () => {
    expect(
      buildFlatQueryArgs({
        groupByPropertyId: undefined,
        spanDescendants: true,
        targetPageTypeId: CHILD_PAGE_TYPE_ID,
        pageTypeSlug: SLUG,
        effectiveConfig: RELATION_FILTERED,
        properties: NO_PROPS,
      })
    ).toBeUndefined()
  })
})
