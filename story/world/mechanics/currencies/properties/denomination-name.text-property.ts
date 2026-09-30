import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const denominationName = {
  id: "01a0f1da-0621-7856-baa2-28a276efe77c",
  type: "page-type/text-property",
  slug: "denomination-name",
  propertySlug: "name",
  definition: "what one coin or unit of a currency is called",
  maxLength: 40,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
