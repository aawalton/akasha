import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type WorldSlug = Slug

export const worldSlug = {
  id: "01a06424-329c-7149-a41a-d7dec22745d0",
  pageTypeSlug: "relation-property",
  slug: "world-slug",
  propertySlug: "world-slug",
  definition: "the world something is of",
  targetPageTypeSlug: "page-type/world",
} as const satisfies RelationProperty
