import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ToPattern = string

export const toPattern = {
  id: "01a0822d-9b8f-73be-b2e0-78ae367e917b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "to-pattern",
  propertySlug: "to-pattern",
  definition: "the construction akasha writes in that one's place",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
