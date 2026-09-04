import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type InitiativeSlug = Slug

export const initiativeSlug = {
  id: "01a062b2-e0ca-7d66-80c6-fc6a09f8099f",
  pageTypeSlug: "relation-property",
  slug: "initiative-slug",
  propertySlug: "initiative-slug",
  definition: "a slug naming an initiative",
  targetPageTypeSlug: "page-type/initiative",
} as const satisfies RelationProperty
