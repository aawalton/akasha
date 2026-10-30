import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const amazonOrderNumber = {
  id: "01a0680b-2b00-7009-8b64-2d5f7a1c210a",
  type: "page-type/text-property",
  slug: "amazon-order-number",
  propertySlug: "amazon-order-number",
  definition: "the number Amazon gives the purchase behind a Monarch transaction",
  maxLength: 40,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:44:27.944Z",
} as const satisfies TextProperty
