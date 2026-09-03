import type { EmailAddressProperty } from "@akasha/pages-system/email-address-property"

export type RoyalRoadUsername = string

export const royalRoadUsername = {
  id: "01a0685d-b81f-79bb-a097-70cc1e0610d2",
  pageTypeSlug: "email-address-property",
  slug: "royal-road-username",
  propertySlug: "username",
  definition: "the address a Royal Road account signs in as",
} as const satisfies EmailAddressProperty
