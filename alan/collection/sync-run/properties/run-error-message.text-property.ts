import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const runErrorMessage = {
  id: "01a06861-f664-7c01-8a3b-11d2a4e70004",
  type: "page-type/text-property",
  slug: "run-error-message",
  propertySlug: "run-error-message",
  definition: "what a pull said as it failed",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
