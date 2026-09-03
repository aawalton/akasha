import type { TextProperty } from "@akasha/pages-system/text-property"

export type SubItemIds = string

export const subItemIds = {
  id: "01a06589-d12a-7346-a454-0ce946af3a11",
  pageTypeSlug: "text-property",
  slug: "sub-item-ids",
  propertySlug: "sub-item-ids",
  definition: "the statements sitting under this one",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
