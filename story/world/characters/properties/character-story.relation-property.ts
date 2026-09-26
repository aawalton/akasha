import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterStory = {
  id: "01a0c9f1-197c-735b-a3bb-c0c588585617",
  type: "page-type/relation-property",
  slug: "character-story",
  propertySlug: "story",
  definition: "the story a character is in",
  targetPageType: "page-type/story",
  types: "ts",
} as const satisfies RelationProperty
