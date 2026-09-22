import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const playedChapterStory = {
  id: "01a08421-9d1c-792e-b906-be0d553df679",
  type: "page-type/relation-property",
  slug: "played-chapter-story",
  propertySlug: "story",
  definition: "a played chapter's story",
  targetPageType: "page-type/story-played",
  types: "ts",
} as const satisfies RelationProperty
