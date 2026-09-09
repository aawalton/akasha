import type { TextProperty } from "@akasha/pages/text-property"

export type Chosen = string

export const chosen = {
  id: "01a06577-f385-737a-9f0e-fb2cdc3c37e3",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "chosen",
  propertySlug: "chosen",
  definition: "the option a decision settled on",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
