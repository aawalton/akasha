import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const carYear = {
  id: "01a06827-645d-7785-a6e3-9c3c06e799fd",
  type: "page-type/relation-property",
  slug: "car-year",
  propertySlug: "car-year",
  definition: "this trim's model year",
  targetPageType: "page-type/car-year",
  types: "ts",
} as const satisfies RelationProperty
