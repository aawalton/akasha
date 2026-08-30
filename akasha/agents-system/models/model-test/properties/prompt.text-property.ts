import type { TextProperty } from "../../../../pages-system/text-property/text-property.page-type.ts"

export type Prompt = string

export const prompt = {
  id: "01a053eb-6b24-748f-883e-fec346a82dfe",
  pageTypeSlug: "text-property",
  slug: "prompt",
  propertySlug: "prompt",
  definition: "what a model is asked, before the text judged is appended",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
