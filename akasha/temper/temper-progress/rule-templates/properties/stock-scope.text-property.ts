import type { TextProperty } from "@akasha/pages-system/text-property"

export type StockScope = string

export const stockScope = {
  id: "01a05fd0-3aa6-791c-b6da-a96ebc31c770",
  pageTypeSlug: "text-property",
  slug: "stock-scope",
  propertySlug: "stock-scope",
  definition: "how far a rule keeping a quantity counts what is already held",
  max: 50,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
