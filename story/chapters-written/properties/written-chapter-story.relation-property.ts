import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const writtenChapterStory = {
  id: "01a08421-af14-7b13-93bb-d068c36b5e74",
  type: "relation-property",
  slug: "written-chapter-story",
  propertySlug: "story",
  definition: "the story a chapter was written for",
  targetPageType: "page-type/story-written",
  types: "ts",
} as const satisfies RelationProperty
