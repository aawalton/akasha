import type { TextProperty } from "@akasha/pages-system/text-property"

export type Sources = string

export const sources = {
  id: "01a06598-68c9-7bdb-8e14-6e97328cca0a",
  pageTypeSlug: "text-property",
  slug: "sources",
  propertySlug: "sources",
  definition: "where what is written here was read from",
  max: 20000,
  nameFormatSlug: null,
} as const satisfies TextProperty
