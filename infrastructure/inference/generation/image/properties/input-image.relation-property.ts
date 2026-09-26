import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const inputImage = {
  id: "01a0de80-955e-7806-846e-059a1880c26d",
  type: "page-type/relation-property",
  slug: "input-image",
  propertySlug: "input-image",
  definition: "the image a model service was handed to remake",
  targetPageType: "page-type/image",
  types: "ts",
} as const satisfies RelationProperty
