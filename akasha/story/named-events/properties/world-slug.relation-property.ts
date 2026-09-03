import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type WorldSlug = Slug

export const worldSlug = {
  id: "01a0658b-9f41-79e2-8ec4-5fb8e225df39",
  pageTypeSlug: "relation-property",
  slug: "world-slug",
  propertySlug: "world-slug",
  definition: "the made-up somewhere a thing belongs to",
  targetPageTypeSlug: "page-type/world",
} as const satisfies RelationProperty
