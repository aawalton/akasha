import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const slideDeck = {
  id: "01a0d622-64e3-7fb3-8cfc-eafedf505604",
  type: "page-type/relation-property",
  slug: "slide-deck",
  propertySlug: "deck",
  definition: "the site document a slide is shown in",
  targetPageType: "page-type/site-document",
  types: "ts",
} as const satisfies RelationProperty
