import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PlayedChapterStorySlug = Slug

export const playedChapterStorySlug = {
  id: "01a08421-9d1c-792e-b906-be0d553df679",
  pageTypeSlug: "relation-property",
  slug: "played-chapter-story-slug",
  propertySlug: "story-slug",
  definition: "the story a chapter was played in",
  targetPageTypeSlug: "page-type/story-played",
} as const satisfies RelationProperty
