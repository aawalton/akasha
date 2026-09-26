import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemStory = {
  id: "01a0ca51-ab29-7dac-baca-b90af4d97847",
  type: "page-type/relation-property",
  slug: "item-story",
  propertySlug: "story",
  definition: "the story an item is in",
  targetPageType: "page-type/story",
  types: "ts",
} as const satisfies RelationProperty
