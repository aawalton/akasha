import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChargingNetworkAccess = string

export const chargingNetworkAccess = {
  id: "01a0659e-e27d-7692-bf6e-f1040e3a10bf",
  pageTypeSlug: "text-property",
  slug: "charging-network-access",
  propertySlug: "charging-network-access",
  definition: "which charging networks the make's cars can use",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
