import type { TextProperty } from "@akasha/pages/text-property"

export type ModelYearsAvailable = string

export const modelYearsAvailable = {
  id: "01a0659a-4bc5-7b5a-9655-87602ecc77d6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "model-years-available",
  propertySlug: "model-years-available",
  definition: "the model years the nameplate was sold in",
  maxLength: 50,
  nameFormat: null,
} as const satisfies TextProperty
