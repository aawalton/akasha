import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const categoryDecidedBy = {
  id: "01a0680b-2b00-7008-a273-8c1e4d9f2109",
  type: "text-property",
  slug: "category-decided-by",
  propertySlug: "category-decided-by",
  definition: "who settled a transaction's category and on what evidence",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
