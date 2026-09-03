import type { TextProperty } from "@akasha/pages-system/text-property"

export type Country = string

export const country = {
  id: "01a0659b-cde9-7b5e-849c-91bff7a70828",
  pageTypeSlug: "text-property",
  slug: "country",
  propertySlug: "country",
  definition: "where the make is headquartered",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
