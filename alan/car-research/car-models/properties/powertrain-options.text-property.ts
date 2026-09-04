import type { TextProperty } from "@akasha/pages-system/text-property"

export type PowertrainOptions = string

export const powertrainOptions = {
  id: "01a0659a-4bc5-7126-b2df-81746b573d49",
  pageTypeSlug: "text-property",
  slug: "powertrain-options",
  propertySlug: "powertrain-options",
  definition: "the kinds of powertrain the model is sold with",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
