import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const locationExitTo = {
  id: "01a0d936-f974-74a2-a447-359bb067c059",
  type: "page-type/relation-property",
  slug: "location-exit-to",
  propertySlug: "to",
  definition: "the location an exit leads to",
  targetPageType: "page-type/game-location",
  types: "ts",
} as const satisfies RelationProperty
