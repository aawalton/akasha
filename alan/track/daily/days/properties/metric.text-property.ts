import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const metric = {
  id: "01a060fb-040e-717a-b2b7-1be127ff16c2",
  type: "text-property",
  slug: "metric",
  propertySlug: "metric",
  definition: "the kind of measurement a reading has",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
