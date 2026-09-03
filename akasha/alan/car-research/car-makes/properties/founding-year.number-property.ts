import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FoundingYear = number

export const foundingYear = {
  id: "01a0659b-cde9-7b57-9d8e-db0755fd8d85",
  pageTypeSlug: "number-property",
  slug: "founding-year",
  propertySlug: "founding-year",
  definition: "the year the make was founded",
  max: null,
} as const satisfies NumberProperty
