import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageEthnicityTags = {
  id: "01a0de87-c73f-73e3-85ea-35a059ee575c",
  type: "page-type/multi-relation-property",
  slug: "image-ethnicity-tags",
  propertySlug: "ethnicity-tags",
  definition: "the ethnicities the figures in an image are drawn as",
  targetPageType: "page-type/ethnicity-tag",
  types: "ts",
  createdAt: "2026-09-26T16:23:55.455Z",
  updatedAt: "2026-09-26T16:24:45.000Z",
} as const satisfies MultiRelationProperty
