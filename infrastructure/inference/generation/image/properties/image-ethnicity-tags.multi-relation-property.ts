import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageEthnicityTags = {
  id: "01a0de87-c73f-73e3-85ea-35a059ee575c",
  type: "page-type/multi-relation-property",
  slug: "image-ethnicity-tags",
  propertySlug: "ethnicity-tags",
  definition: "the ethnicities the figures in an image are drawn as",
  targetPageType: "page-type/ethnicity-tag",
  types: "ts",
} as const satisfies MultiRelationProperty
