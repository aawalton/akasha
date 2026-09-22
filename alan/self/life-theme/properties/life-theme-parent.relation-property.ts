import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const lifeThemeParent = {
  id: "01a06575-c2c0-7056-ae18-c6709597f811",
  type: "page-type/relation-property",
  slug: "life-theme-parent",
  propertySlug: "life-theme-parent",
  definition: "this life theme's parent theme",
  targetPageType: "page-type/life-theme",
  types: "ts",
} as const satisfies RelationProperty
