import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const amazonOrderNumber = {
  id: "01a0680b-2b00-7009-8b64-2d5f7a1c210a",
  type: "page-type/text-property",
  slug: "amazon-order-number",
  propertySlug: "amazon-order-number",
  definition: "a transaction's Amazon order",
  maxLength: 40,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
