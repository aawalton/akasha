import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const haremHotelFloorCharacter = {
  id: "01a0e822-39b4-7464-bee4-28d89d0777ae",
  type: "page-type/relation-property",
  slug: "harem-hotel-floor-character",
  propertySlug: "character",
  definition: "the character a floor of the Harem Hotel sets its task for",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
