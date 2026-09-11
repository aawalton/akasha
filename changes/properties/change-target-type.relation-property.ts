import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const changeTargetType = {
  id: "01a07c70-2049-7248-8790-afaa12ca852e",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "change-target-type",
  propertySlug: "change-target-type",
  definition: "the change target type a page names",
  targetPageType: "page-type/change-target-type",
  types: "ts",
} as const satisfies RelationProperty
