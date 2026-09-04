import type { TextProperty } from "@akasha/pages-system/text-property"

export type Chosen = string

export const chosen = {
  id: "01a06577-f385-737a-9f0e-fb2cdc3c37e3",
  pageTypeSlug: "text-property",
  slug: "chosen",
  propertySlug: "chosen",
  definition: "the option a decision settled on",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
