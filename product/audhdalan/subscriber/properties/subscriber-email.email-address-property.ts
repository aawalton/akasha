import type { EmailAddressProperty } from "akasha/page/email-address-property/email-address-property.page-type.types.ts"

export const subscriberEmail = {
  id: "01a06589-3de2-783b-a7e9-c2869ea975e3",
  type: "page-type/email-address-property",
  slug: "subscriber-email",
  propertySlug: "email",
  definition: "a subscriber's chosen address",
  types: "ts",
} as const satisfies EmailAddressProperty
