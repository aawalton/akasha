import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RunErrorMessage = string

export const runErrorMessage = {
  id: "01a06861-f664-7c01-8a3b-11d2a4e70004",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "run-error-message",
  propertySlug: "run-error-message",
  definition: "what a pull said as it failed",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
