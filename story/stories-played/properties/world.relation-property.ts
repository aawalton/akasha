import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type World = Slug

export const world = {
  id: "01a06424-329c-7149-a41a-d7dec22745d0",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "world",
  propertySlug: "world",
  definition: "the world something is of",
  targetPageType: "page-type/world",
} as const satisfies RelationProperty
