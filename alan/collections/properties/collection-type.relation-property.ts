import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const collectionType = {
  id: "01a06935-8628-7809-8c7e-6a0cb1b50efc",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "collection-type",
  propertySlug: "collection-type",
  definition: "the kind of thing a collection gathers",
  targetPageType: "page-type/collection-type",
  types: "ts",
} as const satisfies RelationProperty
