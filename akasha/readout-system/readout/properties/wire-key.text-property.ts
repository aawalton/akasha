import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type WireKey = string

export const wireKey = {
  id: "01a05446-e768-7d56-aeef-7ab30139e500",
  pageTypeSlug: "text-property",
  slug: "wire-key",
  propertySlug: "wire-key",
  definition: "the key a reading travels under on the wire",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
