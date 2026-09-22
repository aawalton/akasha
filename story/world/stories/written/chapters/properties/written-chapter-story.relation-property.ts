import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const writtenChapterStory = {
  id: "01a08421-af14-7b13-93bb-d068c36b5e74",
  type: "page-type/relation-property",
  slug: "written-chapter-story",
  propertySlug: "story",
  definition: "a written chapter's story",
  targetPageType: "page-type/story-written",
  types: "ts",
} as const satisfies RelationProperty
