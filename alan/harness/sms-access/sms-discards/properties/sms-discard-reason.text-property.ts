import type { TextProperty } from "@akasha/pages/text-property"

export type SmsDiscardReason = string

export const smsDiscardReason = {
  id: "01a06861-e7cd-7414-9760-f421f5fffe5f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "sms-discard-reason",
  propertySlug: "reason",
  definition: "why the message was thrown away",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
