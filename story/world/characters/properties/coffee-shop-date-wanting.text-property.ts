import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coffeeShopDateWanting = {
  id: "01a0deed-a4cc-79bb-9227-ff4a00825923",
  type: "page-type/text-property",
  slug: "coffee-shop-date-wanting",
  propertySlug: "wanting",
  definition: "what a character in the Coffee Shop Date is after",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
