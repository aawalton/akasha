import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const chapterStory = {
  id: "01a0c990-40b9-7554-9f99-58add65cd7d4",
  type: "page-type/relation-property",
  slug: "chapter-story",
  propertySlug: "story",
  definition: "a chapter's story",
  targetPageType: "page-type/story",
  types: "ts",
} as const satisfies RelationProperty
