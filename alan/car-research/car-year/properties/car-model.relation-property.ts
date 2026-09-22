import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const carModel = {
  id: "01a0659d-2433-765e-8388-018c1589b5bb",
  type: "page-type/relation-property",
  slug: "car-model",
  propertySlug: "car-model",
  definition: "this year's nameplate",
  targetPageType: "page-type/car-model",
  types: "ts",
} as const satisfies RelationProperty
