import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const jewelrySlot = {
  id: "01a0c9dc-84f9-7fba-abe9-f2e4846b5a1e",
  type: "page-type/relation-property",
  slug: "jewelry-slot",
  propertySlug: "jewelry-slot",
  definition: "a slug naming a place on the body a piece of jewelry is worn",
  targetPageType: "page-type/temper-jewelry-slot",
  types: "ts",
} as const satisfies RelationProperty
