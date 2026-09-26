import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const referenceImages = {
  id: "01a0de80-955e-7528-9b4e-1bc1b70370bf",
  type: "page-type/multi-relation-property",
  slug: "reference-images",
  propertySlug: "reference-images",
  definition: "the images a model service was handed to match beside the image it remade",
  targetPageType: "page-type/image",
  types: "ts",
} as const satisfies MultiRelationProperty
