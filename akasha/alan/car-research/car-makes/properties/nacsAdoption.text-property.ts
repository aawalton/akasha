import type { TextProperty } from "@akasha/pages-system/text-property"

export type NacsAdoption = string

export const nacsAdoption = {
  id: "01a06598-aa80-7b08-8ecb-018a7e505147",
  pageTypeSlug: "text-property",
  slug: "nacsAdoption",
  propertySlug: "nacsAdoption",
  definition: "how far the make has taken up the North American Charging Standard",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
