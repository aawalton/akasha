import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coffeeShopDateFeeling = {
  id: "01a0deed-a4cc-70fa-97db-8731a2ef24b6",
  type: "page-type/text-property",
  slug: "coffee-shop-date-feeling",
  propertySlug: "feeling",
  definition: "how a character in the Coffee Shop Date is",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
