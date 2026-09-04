import type { TextProperty } from "@akasha/pages-system/text-property"

export type Ticker = string

export const ticker = {
  id: "01a0680a-1a00-7012-a936-8c5e1b7d1112",
  pageTypeSlug: "text-property",
  slug: "ticker",
  propertySlug: "ticker",
  definition: "the short name a security trades under",
  max: 12,
  nameFormatSlug: null,
} as const satisfies TextProperty
