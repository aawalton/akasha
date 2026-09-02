import type { TextProperty } from "@akasha/pages-system/text-property"

export type Key = string

export const key = {
  id: "01a05fac-7582-7040-9ede-eeb380f191f1",
  pageTypeSlug: "text-property",
  slug: "key",
  propertySlug: "key",
  definition: "the string The Elder Scrolls Online names a thing by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
