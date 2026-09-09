import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type StorySlug = Slug

export const storySlug = {
  id: "01a08369-3901-79f2-9502-2e95b7133685",
  pageTypeSlug: "relation-property",
  slug: "story-slug",
  propertySlug: "story-slug",
  definition: "the story a chapter was read in",
  targetPageType: "page-type/story-read",
} as const satisfies RelationProperty
