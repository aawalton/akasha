import type { TextProperty } from "@akasha/pages/text-property"

export type Metric = string

export const metric = {
  id: "01a060fb-040e-717a-b2b7-1be127ff16c2",
  pageTypeSlug: "text-property",
  slug: "metric",
  propertySlug: "metric",
  definition: "the kind of measurement a reading has",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
