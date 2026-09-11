import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const prompt = {
  id: "01a053eb-6b24-748f-883e-fec346a82dfe",
  type: "text-property",
  slug: "prompt",
  propertySlug: "prompt",
  definition: "what a model is asked, before the text judged is appended",
  maxLength: 6000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
