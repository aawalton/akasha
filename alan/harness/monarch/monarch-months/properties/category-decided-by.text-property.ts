import type { TextProperty } from "@akasha/pages-system/text-property"

export type CategoryDecidedBy = string

export const categoryDecidedBy = {
  id: "01a0680b-2b00-7008-a273-8c1e4d9f2109",
  pageTypeSlug: "text-property",
  slug: "category-decided-by",
  propertySlug: "category-decided-by",
  definition: "who settled a transaction's category and on what evidence",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
