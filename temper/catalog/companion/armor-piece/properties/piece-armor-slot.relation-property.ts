import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const pieceArmorSlot = {
  id: "01a0e0bf-70b2-7006-8e7b-674bd38d5ef2",
  type: "page-type/relation-property",
  slug: "piece-armor-slot",
  propertySlug: "companion-armor-slot",
  definition: "the place on a companion a piece of armor is worn",
  targetPageType: "page-type/temper-companion-armor-slot",
  types: "ts",
} as const satisfies RelationProperty
