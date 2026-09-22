import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const armorSlot = {
  id: "01a0c9dc-6361-7091-b517-27858cb806bb",
  type: "page-type/relation-property",
  slug: "armor-slot",
  propertySlug: "armor-slot",
  definition: "a slug naming a place on the body a piece of armor is worn",
  targetPageType: "page-type/temper-armor-slot",
  types: "ts",
} as const satisfies RelationProperty
