import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const pageTypeSlug = {
  id: "01a04a10-319c-7000-a5f4-e048da231b65",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "page-type-slug",
  propertySlug: "page-type-slug",
  definition: "the page type a page is",
  targetPageType: "page-type/page-type",
  types: "ts",
} as const satisfies RelationProperty
