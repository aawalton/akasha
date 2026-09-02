import type { TextProperty } from "@akasha/pages-system/text-property"

export type FlavorText = string

export const flavorText = {
  id: "01a05fcd-f54e-776c-b0e8-56c34894de30",
  pageTypeSlug: "text-property",
  slug: "flavor-text",
  propertySlug: "flavor-text",
  definition: "the lore line printed on an item",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
