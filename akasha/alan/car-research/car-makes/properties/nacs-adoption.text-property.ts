import type { TextProperty } from "@akasha/pages-system/text-property"

export type NacsAdoption = string

export const nacsAdoption = {
  id: "01a0659b-cde9-7d7e-9b7e-984f3081fbb2",
  pageTypeSlug: "text-property",
  slug: "nacs-adoption",
  propertySlug: "nacs-adoption",
  definition: "how far the make has taken up the North American Charging Standard",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
