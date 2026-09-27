import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const pieceArmorWeight = {
  id: "01a0e0bf-70b2-7007-9cd7-325aea75b7c8",
  type: "page-type/relation-property",
  slug: "piece-armor-weight",
  propertySlug: "companion-armor-weight",
  definition: "how heavy a companion's piece of armor is made",
  targetPageType: "page-type/temper-companion-armor-weight",
  types: "ts",
} as const satisfies RelationProperty
