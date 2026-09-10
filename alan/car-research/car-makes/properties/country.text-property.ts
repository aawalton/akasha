import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Country = string

export const country = {
  id: "01a0659e-e27d-78b7-b41b-3c0896a203e2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "country",
  propertySlug: "country",
  definition: "where the make is headquartered",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
