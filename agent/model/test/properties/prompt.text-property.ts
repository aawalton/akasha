import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const prompt = {
  id: "01a053eb-6b24-748f-883e-fec346a82dfe",
  type: "page-type/text-property",
  slug: "prompt",
  propertySlug: "prompt",
  definition: "the text sent to a model",
  maxLength: 6000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
