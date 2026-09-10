import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const groups = {
  id: "01a05446-e765-7da7-afdf-68470bd5fc40",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "groups",
  propertySlug: "groups",
  definition: "the groups a reading is drawn in",
  targetPageType: "page-type/readout-group",
  types: "ts",
} as const satisfies RelationProperty
