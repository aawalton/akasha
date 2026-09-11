import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const gbwwStory = {
  id: "01a0659f-93da-7018-aaa6-cc9fe69f53bd",
  type: "relation-property",
  slug: "gbww-story",
  propertySlug: "story",
  definition: "the book written out of a reading",
  targetPageType: "page-type/book",
  types: "ts",
} as const satisfies RelationProperty
