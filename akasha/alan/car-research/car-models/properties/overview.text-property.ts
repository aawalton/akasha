import type { TextProperty } from "@akasha/pages-system/text-property"

export type Overview = string

export const overview = {
  id: "01a0659a-4bc5-79cb-a115-462aa4073a48",
  pageTypeSlug: "text-property",
  slug: "overview",
  propertySlug: "overview",
  definition: "what the model is, in a paragraph",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
