import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PlayedStorySlug = Slug

export const playedStorySlug = {
  id: "01a06828-cb98-7a8f-a4fb-4b2676ab5c61",
  pageTypeSlug: "relation-property",
  slug: "played-story-slug",
  propertySlug: "played-story-slug",
  definition: "the story nobody wrote that something is part of",
  targetPageTypeSlug: "page-type/story-played",
} as const satisfies RelationProperty
