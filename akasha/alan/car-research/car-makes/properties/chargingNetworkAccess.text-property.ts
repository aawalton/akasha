import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChargingNetworkAccess = string

export const chargingNetworkAccess = {
  id: "01a06598-aa80-70d7-98d0-ee80035fd1dd",
  pageTypeSlug: "text-property",
  slug: "chargingNetworkAccess",
  propertySlug: "chargingNetworkAccess",
  definition: "which charging networks the make's cars can use",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
