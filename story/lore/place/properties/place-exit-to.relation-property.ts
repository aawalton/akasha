import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const placeExitTo = {
  id: "01a0d42f-0d04-7c2f-89be-4acc677086c6",
  type: "page-type/relation-property",
  slug: "place-exit-to",
  propertySlug: "to",
  definition: "the place an exit leads to",
  targetPageType: "page-type/place",
  types: "ts",
} as const satisfies RelationProperty
