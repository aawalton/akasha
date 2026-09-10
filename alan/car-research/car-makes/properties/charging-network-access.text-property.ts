import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ChargingNetworkAccess = string

export const chargingNetworkAccess = {
  id: "01a0659e-e27d-7692-bf6e-f1040e3a10bf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "charging-network-access",
  propertySlug: "charging-network-access",
  definition: "which charging networks the make's cars can use",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
