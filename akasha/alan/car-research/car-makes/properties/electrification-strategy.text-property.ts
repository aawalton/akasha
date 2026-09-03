import type { TextProperty } from "@akasha/pages-system/text-property"

export type ElectrificationStrategy = string

export const electrificationStrategy = {
  id: "01a0659e-e27d-7ce8-ae50-67ddbd30dc58",
  pageTypeSlug: "text-property",
  slug: "electrification-strategy",
  propertySlug: "electrification-strategy",
  definition: "what the make has said it will build and by when",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
