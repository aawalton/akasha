import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type GbwwStorySlug = Slug

export const gbwwStorySlug = {
  id: "01a0659f-93da-7018-aaa6-cc9fe69f53bd",
  pageTypeSlug: "relation-property",
  slug: "gbww-story-slug",
  propertySlug: "story-slug",
  definition: "the book written out of a reading",
  targetPageTypeSlug: "page-type/book",
} as const satisfies RelationProperty
