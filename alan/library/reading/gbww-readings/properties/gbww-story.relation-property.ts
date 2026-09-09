import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type GbwwStory = Slug

export const gbwwStory = {
  id: "01a0659f-93da-7018-aaa6-cc9fe69f53bd",
  pageTypeSlug: "relation-property",
  slug: "gbww-story",
  propertySlug: "story",
  definition: "the book written out of a reading",
  targetPageType: "page-type/book",
} as const satisfies RelationProperty
