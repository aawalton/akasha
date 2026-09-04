import type { TextProperty } from "@akasha/pages-system/text-property"

export type NacsAdoption = string

export const nacsAdoption = {
  id: "01a0659e-e27e-784d-a99b-e23ec274b8fc",
  pageTypeSlug: "text-property",
  slug: "nacs-adoption",
  propertySlug: "nacs-adoption",
  definition: "how far the make has taken up the North American Charging Standard",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
