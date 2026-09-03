import type { TextProperty } from "@akasha/pages-system/text-property"

export type ElectrificationStrategy = string

export const electrificationStrategy = {
  id: "01a0659b-cde9-75e4-ac9e-4037fbd1669c",
  pageTypeSlug: "text-property",
  slug: "electrification-strategy",
  propertySlug: "electrification-strategy",
  definition: "what the make has said it will build and by when",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
