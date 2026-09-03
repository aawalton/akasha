import type { TextProperty } from "@akasha/pages-system/text-property"

export type RedemptionCode = string

export const redemptionCode = {
  id: "01a06585-5fc5-776e-b99f-aefd3a1f5ffe",
  pageTypeSlug: "text-property",
  slug: "redemption-code",
  propertySlug: "redemption-code",
  definition: "what to give to claim the offer",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
