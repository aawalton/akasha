import type { TextProperty } from "@akasha/pages/text-property"

export type SmsDiscardSender = string

export const smsDiscardSender = {
  id: "01a06861-e7cd-71ef-942a-5e60d20f9d50",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "sms-discard-sender",
  propertySlug: "sender",
  definition: "the number a thrown-away message came from",
  maxLength: 40,
  nameFormat: null,
} as const satisfies TextProperty
