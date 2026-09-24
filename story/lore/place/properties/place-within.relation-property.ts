import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const placeWithin = {
  id: "01a0d42e-f4fd-7cd3-9844-8ecb11ed1377",
  type: "page-type/relation-property",
  slug: "place-within",
  propertySlug: "within",
  definition: "the place a place is inside",
  targetPageType: "page-type/place",
  types: "ts",
} as const satisfies RelationProperty
