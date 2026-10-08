import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const carMake = {
  id: "01a0659a-4bc5-7b5d-a286-f3e3942ccd3b",
  type: "page-type/relation-property",
  slug: "car-make",
  propertySlug: "car-make",
  definition: "the make that builds this nameplate",
  targetPageType: "page-type/car-make",
  types: "ts",
  createdAt: "2026-09-03T04:50:05.893Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
