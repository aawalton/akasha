import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const jewelryType = {
  id: "01a05fd1-d43c-7d49-81c6-a1c0aa409075",
  type: "page-type/relation-property",
  slug: "jewelry-type",
  propertySlug: "jewelry-type",
  definition: "the kind of jewelry a slot takes",
  targetPageType: "page-type/temper-jewelry-type",
  types: "ts",
} as const satisfies RelationProperty
