import type { TextProperty } from "@akasha/pages-system/text-property"

export type InvariantStatement = string

export const invariantStatement = {
  id: "01a049c8-3ead-7c41-ae0b-d4c110afbc4f",
  pageTypeSlug: "text-property",
  slug: "invariant-statement",
  propertySlug: "statement",
  definition: "one sentence an invariant holds a page to",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
