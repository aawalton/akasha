import type { TextProperty } from "@akasha/pages/text-property"

export type Sources = string

export const sources = {
  id: "01a06598-68c9-7bdb-8e14-6e97328cca0a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "sources",
  propertySlug: "sources",
  definition: "where what is written here was read from",
  maxLength: 20000,
  nameFormat: null,
} as const satisfies TextProperty
