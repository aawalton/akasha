import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const playedStory = {
  id: "01a06828-cb98-7a8f-a4fb-4b2676ab5c61",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "played-story",
  propertySlug: "played-story",
  definition: "the story nobody wrote that something is part of",
  targetPageType: "page-type/story-played",
  types: "ts",
} as const satisfies RelationProperty
