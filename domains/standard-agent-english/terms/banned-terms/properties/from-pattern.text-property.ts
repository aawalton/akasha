import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type FromPattern = string

export const fromPattern = {
  id: "01a0822d-8673-7397-8503-1c02923906e6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "from-pattern",
  propertySlug: "from-pattern",
  definition: "a construction a banned term is written in",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
