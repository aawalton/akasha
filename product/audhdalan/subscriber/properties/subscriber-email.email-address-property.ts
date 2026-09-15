import type { EmailAddressProperty } from "akasha/page/email-address-property/email-address-property.page-type.types.ts"

export const subscriberEmail = {
  id: "01a06589-3de2-783b-a7e9-c2869ea975e3",
  type: "page-type/email-address-property",
  slug: "subscriber-email",
  propertySlug: "email",
  definition: "the address a subscriber asked to be written to at",
  types: "ts",
} as const satisfies EmailAddressProperty
