import type { TextProperty } from "@akasha/pages-system/text-property"

export type SubItemIds = string

export const subItemIds = {
  id: "01a06575-c2b8-7c57-89d7-1639a8309642",
  pageTypeSlug: "text-property",
  slug: "sub-item-ids",
  propertySlug: "sub-item-ids",
  definition: "the statements sitting under this one",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
