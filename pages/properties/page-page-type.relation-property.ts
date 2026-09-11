import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const pagePageType = {
  id: "01a08788-f002-7f3a-98b4-1f2f970f0454",
  type: "relation-property",
  slug: "page-page-type",
  propertySlug: "type",
  definition: "the page type a page is",
  targetPageType: "page-type/page-type",
  types: "ts",
} as const satisfies RelationProperty
