import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const jewelryTrait = {
  id: "01a0c9d0-3b07-71fc-a503-3eee50983c66",
  type: "page-type/relation-property",
  slug: "jewelry-trait",
  propertySlug: "jewelry-trait",
  definition: "a slug naming a trait worked into a piece of jewelry",
  targetPageType: "page-type/temper-jewelry-trait",
  types: "ts",
  createdAt: "2026-09-22T15:51:02.151Z",
  updatedAt: "2026-09-22T15:55:27.000Z",
} as const satisfies RelationProperty
