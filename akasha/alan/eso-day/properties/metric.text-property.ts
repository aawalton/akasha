import type { TextProperty } from "@akasha/pages-system/text-property"

export type Metric = string

export const metric = {
  id: "01a060fb-040e-717a-b2b7-1be127ff16c2",
  pageTypeSlug: "text-property",
  slug: "metric",
  propertySlug: "metric",
  definition: "the kind of measurement a reading carries",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
