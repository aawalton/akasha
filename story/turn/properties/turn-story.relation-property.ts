import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const turnStory = {
  id: "01a0c9fc-754e-79e2-a291-f3579e7c167c",
  type: "page-type/relation-property",
  slug: "turn-story",
  propertySlug: "story",
  definition: "the story a turn is part of",
  targetPageType: "page-type/story",
  types: "ts",
} as const satisfies RelationProperty
