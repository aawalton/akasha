import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const majorBuff = {
  id: "01a0c9ff-54ce-7c74-a920-591d45f0644d",
  type: "page-type/relation-property",
  slug: "major-buff",
  propertySlug: "major-buff",
  definition: "a slug naming a helpful effect the game names Major",
  targetPageType: "page-type/temper-buff-major",
  types: "ts",
} as const satisfies RelationProperty
