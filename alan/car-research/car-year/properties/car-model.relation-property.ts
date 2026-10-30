import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const carModel = {
  id: "01a0659d-2433-765e-8388-018c1589b5bb",
  type: "page-type/relation-property",
  slug: "car-model",
  propertySlug: "car-model",
  definition: "the car model a model year belongs to",
  targetPageType: "page-type/car-model",
  types: "ts",
  createdAt: "2026-09-03T04:53:12.371Z",
  updatedAt: "2026-10-30T15:03:03.112Z",
} as const satisfies RelationProperty
