import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ReadStory = Slug

export const readStory = {
  id: "01a0876d-19d9-7101-9f3b-ce14b0ad936d",
  pageTypeSlug: "relation-property",
  slug: "read-story",
  propertySlug: "story",
  definition: "the story a chapter was read in",
  targetPageType: "page-type/story-read",
} as const satisfies RelationProperty
