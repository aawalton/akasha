import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const loreDisclosure = {
  id: "01a0d41b-b3bc-7566-be2d-9b08e437424e",
  type: "page-type/relation-property",
  slug: "lore-disclosure",
  propertySlug: "lore-disclosure",
  definition: "who a piece of lore is known to",
  targetPageType: "page-type/lore-disclosure",
  types: "ts",
} as const satisfies RelationProperty
