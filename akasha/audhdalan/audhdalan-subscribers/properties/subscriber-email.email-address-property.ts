import type { EmailAddressProperty } from "@akasha/pages-system/email-address-property"

export type SubscriberEmail = string

export const subscriberEmail = {
  id: "01a06589-3de2-783b-a7e9-c2869ea975e3",
  pageTypeSlug: "email-address-property",
  slug: "subscriber-email",
  propertySlug: "email",
  definition: "the address a subscriber asked to be written to at",
} as const satisfies EmailAddressProperty
