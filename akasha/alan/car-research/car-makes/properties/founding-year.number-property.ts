import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FoundingYear = number

export const foundingYear = {
  id: "01a0659e-e27e-7c12-bf81-3fdefb838507",
  pageTypeSlug: "number-property",
  slug: "founding-year",
  propertySlug: "founding-year",
  definition: "the year the make was founded",
  max: null,
} as const satisfies NumberProperty
