import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const lifeThemeParent = {
  id: "01a06575-c2c0-7056-ae18-c6709597f811",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "life-theme-parent",
  propertySlug: "life-theme-parent",
  definition: "the life theme this one is under",
  targetPageType: "page-type/life-theme",
  types: "ts",
} as const satisfies RelationProperty
