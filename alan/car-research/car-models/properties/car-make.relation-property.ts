import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const carMake = {
  id: "01a0659a-4bc5-7b5d-a286-f3e3942ccd3b",
  type: "relation-property",
  slug: "car-make",
  propertySlug: "car-make",
  definition: "the make that builds this nameplate",
  targetPageType: "page-type/car-make",
  types: "ts",
} as const satisfies RelationProperty
