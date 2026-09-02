import type { TextProperty } from "@akasha/pages-system/text-property"

export type FirstName = string

export const firstName = {
  id: "01a05fcd-f544-7cb1-bba6-6e863b43b867",
  pageTypeSlug: "text-property",
  slug: "first-name",
  propertySlug: "first-name",
  definition: "what a character is called for short",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
