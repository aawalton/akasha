import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const slideDeck = {
  id: "01a0d622-64e3-7fb3-8cfc-eafedf505604",
  type: "page-type/relation-property",
  slug: "slide-deck",
  propertySlug: "deck",
  definition: "the site document a slide is shown in",
  targetPageType: "page-type/site-document",
  types: "ts",
  createdAt: "2026-09-25T01:16:13.411Z",
  updatedAt: "2026-09-25T01:16:17.000Z",
} as const satisfies RelationProperty
