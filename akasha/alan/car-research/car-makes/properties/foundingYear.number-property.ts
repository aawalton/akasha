import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FoundingYear = number

export const foundingYear = {
  id: "01a06598-aa80-7811-8db0-89782492f41d",
  pageTypeSlug: "number-property",
  slug: "foundingYear",
  propertySlug: "foundingYear",
  definition: "the year the make was founded",
  max: null,
} as const satisfies NumberProperty
