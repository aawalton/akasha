import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const overwhereIvConditionHeldCharacter = {
  id: "01a0f1ba-b380-7e9e-a7e6-c7dffcea49e5",
  type: "page-type/relation-property",
  slug: "overwhere-iv-condition-held-character",
  propertySlug: "character",
  definition: "the character under a condition in Overwhere IV",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
