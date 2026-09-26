import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageAgeTags = {
  id: "01a0de87-c73e-71ba-8475-72ed75354028",
  type: "page-type/multi-relation-property",
  slug: "image-age-tags",
  propertySlug: "age-tags",
  definition: "the ages the figures in an image are drawn as",
  targetPageType: "page-type/age-tag",
  types: "ts",
} as const satisfies MultiRelationProperty
