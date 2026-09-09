import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Initiative = Slug

export const initiative = {
  id: "01a062b2-e0ca-7d66-80c6-fc6a09f8099f",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "initiative",
  propertySlug: "initiative",
  definition: "a slug naming an initiative",
  targetPageType: "page-type/initiative",
} as const satisfies RelationProperty
