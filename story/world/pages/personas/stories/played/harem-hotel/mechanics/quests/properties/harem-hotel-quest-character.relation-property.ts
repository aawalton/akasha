import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const haremHotelQuestCharacter = {
  id: "01a0de28-77bc-77de-abdb-4fd2f0a1bacb",
  type: "page-type/relation-property",
  slug: "harem-hotel-quest-character",
  propertySlug: "character",
  definition: "the character a quest in the Harem Hotel is set for",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
