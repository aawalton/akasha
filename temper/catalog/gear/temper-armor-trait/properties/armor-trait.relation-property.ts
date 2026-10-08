import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const armorTrait = {
  id: "01a0c9d0-1bf2-747d-8615-37816fa32e5b",
  type: "page-type/relation-property",
  slug: "armor-trait",
  propertySlug: "armor-trait",
  definition: "a slug naming a trait worked into a piece of armor",
  targetPageType: "page-type/temper-armor-trait",
  types: "ts",
  createdAt: "2026-09-22T15:50:54.194Z",
  updatedAt: "2026-09-22T15:55:27.000Z",
} as const satisfies RelationProperty
