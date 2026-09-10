import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ReadChapterStory = Slug

export const readChapterStory = {
  id: "01a08369-3901-79f2-9502-2e95b7133685",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "read-chapter-story",
  propertySlug: "story",
  definition: "the story a chapter was read in",
  targetPageType: "page-type/story-read",
} as const satisfies RelationProperty
