import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const minorBuff = {
  id: "01a0c9ff-636a-7a2b-8b12-544cb32ee41f",
  type: "page-type/relation-property",
  slug: "minor-buff",
  propertySlug: "minor-buff",
  definition: "a slug naming a helpful effect the game names Minor",
  targetPageType: "page-type/temper-buff-minor",
  types: "ts",
  createdAt: "2026-09-22T16:42:32.682Z",
  updatedAt: "2026-09-22T16:43:07.000Z",
} as const satisfies RelationProperty
