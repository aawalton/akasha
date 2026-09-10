import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Overview = string

export const overview = {
  id: "01a0659a-4bc5-79cb-a115-462aa4073a48",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "overview",
  propertySlug: "overview",
  definition: "what the model is, in a paragraph",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
