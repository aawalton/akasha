import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const playedChapterStory = {
  id: "01a08421-9d1c-792e-b906-be0d553df679",
  type: "relation-property",
  slug: "played-chapter-story",
  propertySlug: "story",
  definition: "the story a chapter was played in",
  targetPageType: "page-type/story-played",
  types: "ts",
} as const satisfies RelationProperty
