import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const denominationWorth = {
  id: "01a0f1da-0622-7109-b391-035e05700b30",
  type: "page-type/number-property",
  slug: "denomination-worth",
  propertySlug: "worth",
  definition: "how many of its currency's smallest unit one of a denomination is worth",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
