import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type WrittenChapterStorySlug = Slug

export const writtenChapterStorySlug = {
  id: "01a08421-af14-7b13-93bb-d068c36b5e74",
  pageTypeSlug: "relation-property",
  slug: "written-chapter-story-slug",
  propertySlug: "story-slug",
  definition: "the story a chapter was written for",
  targetPageTypeSlug: "page-type/story-written",
} as const satisfies RelationProperty
