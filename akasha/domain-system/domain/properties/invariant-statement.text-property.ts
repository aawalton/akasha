import type { TextProperty } from "@akasha/pages-system/text-property"

export type Statement = string

export const invariantStatement = {
  id: "01a049c8-3ead-7c41-ae0b-d4c110afbc4f",
  pageTypeSlug: "text-property",
  slug: "invariant-statement",
  propertySlug: "statement",
  definition: "one sentence of a page's prose",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
