import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const redemptionCode = {
  id: "01a06585-5fc5-776e-b99f-aefd3a1f5ffe",
  type: "text-property",
  slug: "redemption-code",
  propertySlug: "redemption-code",
  definition: "what to give to claim the offer",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
