import { describe, expect, test } from "bun:test"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { ViewFilter } from "@shared/pages-core/schema/view-data"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { buildBaseConditions } from "./base-conditions"

const TARGET_PAGE_TYPE_ID = "019db5f4-063c-710f-a432-4c822d31915a"
const PARENT_ID = "019efbd1-d641-727d-8e98-4f10ccc0cfba"
const EMPTY_MAP: PageTypePropertiesMap = new Map()

const STORY_RELATION: PropertyDefinition = {
  id: "story",
  title: "Story",
  type: "relation",
}

const STORY_MULTI_RELATION: PropertyDefinition = {
  id: "story",
  title: "Story",
  type: "multi-relation",
}

const EQUALS_FILTER: readonly ViewFilter[] = [
  { propertyId: "story", operator: "equals", value: PARENT_ID },
]

describe("buildBaseConditions", () => {
  test("translates a single-relation equals filter to a scalar `eq` condition", () => {
    const where = buildBaseConditions({
      baseFilters: EQUALS_FILTER,
      properties: [STORY_RELATION],
      targetPageTypeId: TARGET_PAGE_TYPE_ID,
      propertiesByPageType: EMPTY_MAP,
    })
    expect(where).toEqual([{ key: "story", eq: PARENT_ID }])
  })

  test("translates a multi-relation equals filter to an `includes` condition", () => {
    const where = buildBaseConditions({
      baseFilters: EQUALS_FILTER,
      properties: [STORY_MULTI_RELATION],
      targetPageTypeId: TARGET_PAGE_TYPE_ID,
      propertiesByPageType: EMPTY_MAP,
    })
    expect(where).toEqual([{ key: "story", includes: PARENT_ID }])
  })

  test("returns undefined when there are no base filters (the bare library listing)", () => {
    const where = buildBaseConditions({
      baseFilters: [],
      properties: [STORY_RELATION],
      targetPageTypeId: TARGET_PAGE_TYPE_ID,
      propertiesByPageType: EMPTY_MAP,
    })
    expect(where).toBeUndefined()
  })

  test("still translates a scalar equals when the property definition is absent", () => {
    const where = buildBaseConditions({
      baseFilters: EQUALS_FILTER,
      properties: [],
      targetPageTypeId: TARGET_PAGE_TYPE_ID,
      propertiesByPageType: EMPTY_MAP,
    })
    expect(where).toEqual([{ key: "story", eq: PARENT_ID }])
  })

  test("ANDs multiple base filters into one condition list", () => {
    const where = buildBaseConditions({
      baseFilters: [
        { propertyId: "story", operator: "equals", value: PARENT_ID },
        { propertyId: "status", operator: "equals", value: "published" },
      ],
      properties: [STORY_RELATION, { id: "status", title: "Status", type: "select" }],
      targetPageTypeId: TARGET_PAGE_TYPE_ID,
      propertiesByPageType: EMPTY_MAP,
    })
    expect(where).toEqual([
      { key: "story", eq: PARENT_ID },
      { key: "status", eq: "published" },
    ])
  })
})
