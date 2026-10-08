import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const initiative = {
  id: "01a062b2-e0ca-7d66-80c6-fc6a09f8099f",
  type: "page-type/relation-property",
  slug: "initiative",
  propertySlug: "initiative",
  definition: "a slug naming an initiative",
  targetPageType: "page-type/initiative",
  types: "ts",
  createdAt: "2026-09-02T15:18:05.258Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
