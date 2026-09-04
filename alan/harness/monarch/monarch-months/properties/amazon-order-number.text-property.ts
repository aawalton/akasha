import type { TextProperty } from "@akasha/pages-system/text-property"

export type AmazonOrderNumber = string

export const amazonOrderNumber = {
  id: "01a0680b-2b00-7009-8b64-2d5f7a1c210a",
  pageTypeSlug: "text-property",
  slug: "amazon-order-number",
  propertySlug: "amazon-order-number",
  definition: "the Amazon order a transaction paid for",
  max: 40,
  nameFormatSlug: null,
} as const satisfies TextProperty
