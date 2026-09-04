import type { TextProperty } from "@akasha/pages-system/text-property"

export type Country = string

export const country = {
  id: "01a0659e-e27d-78b7-b41b-3c0896a203e2",
  pageTypeSlug: "text-property",
  slug: "country",
  propertySlug: "country",
  definition: "where the make is headquartered",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
