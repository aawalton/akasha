import type { EmailAddressProperty } from "akasha/page/email-address-property/email-address-property.page-type.types.ts"

export const subscriberEmail = {
  id: "01a06589-3de2-783b-a7e9-c2869ea975e3",
  type: "page-type/email-address-property",
  slug: "subscriber-email",
  propertySlug: "email",
  definition: "a subscriber's chosen address",
  types: "ts",
  createdAt: "2026-09-03T04:31:28.226Z",
  updatedAt: "2026-09-22T13:46:35.000Z",
} as const satisfies EmailAddressProperty
