import type { TextProperty } from "@akasha/pages/text-property"

export type NacsAdoption = string

export const nacsAdoption = {
  id: "01a0659e-e27e-784d-a99b-e23ec274b8fc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "nacs-adoption",
  propertySlug: "nacs-adoption",
  definition: "how far the make has taken up the North American Charging Standard",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
