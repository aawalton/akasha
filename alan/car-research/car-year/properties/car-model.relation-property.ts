import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const carModel = {
  id: "01a0659d-2433-765e-8388-018c1589b5bb",
  type: "page-type/relation-property",
  slug: "car-model",
  propertySlug: "car-model",
  definition: "this year's nameplate",
  targetPageType: "page-type/car-model",
  types: "ts",
  createdAt: "2026-09-03T04:53:12.371Z",
  updatedAt: "2026-09-22T13:59:16.000Z",
} as const satisfies RelationProperty
