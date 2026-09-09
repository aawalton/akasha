import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PlayedStory = Slug

export const playedStory = {
  id: "01a06828-cb98-7a8f-a4fb-4b2676ab5c61",
  pageTypeSlug: "relation-property",
  slug: "played-story",
  propertySlug: "played-story",
  definition: "the story nobody wrote that something is part of",
  targetPageType: "page-type/story-played",
} as const satisfies RelationProperty
