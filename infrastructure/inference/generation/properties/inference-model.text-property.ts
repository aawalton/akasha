import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const inferenceModel = {
  id: "01a0c643-4796-70e8-aee9-0f0701ab4f9f",
  type: "page-type/text-property",
  slug: "inference-model",
  propertySlug: "model",
  definition: "the weights a model service loaded to make a thing",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
