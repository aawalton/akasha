import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const loadedBy = {
  id: "01a05234-e093-7966-b707-f7ac0f44d5e2",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "loaded-by",
  propertySlug: "loaded-by",
  definition: "the page whose code loads pages of this type",
  targetPageType: "page-type/domain",
  types: "ts",
} as const satisfies RelationProperty
