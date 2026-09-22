import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const selectOptionColor = {
  id: "01a0c532-3208-72dc-b206-6ba84b69e302",
  type: "page-type/relation-property",
  slug: "select-option-color",
  propertySlug: "color",
  definition: "a select property value's color",
  targetPageType: "page-type/color",
  types: "ts",
} as const satisfies RelationProperty
