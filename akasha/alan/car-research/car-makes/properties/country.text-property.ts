import type { TextProperty } from "@akasha/pages-system/text-property"

export type Country = string

export const country = {
  id: "01a06598-aa80-768f-8b2d-80b8e1a78eb7",
  pageTypeSlug: "text-property",
  slug: "country",
  propertySlug: "country",
  definition: "where the make is headquartered",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
