import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const changeKind = {
  id: "01a05f9a-8255-7000-b59d-5bee73097608",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "change-kind",
  propertySlug: "change-kind",
  definition: "the sort of change an act makes",
  targetPageType: "page-type/change-kind",
  types: "ts",
} as const satisfies RelationProperty
