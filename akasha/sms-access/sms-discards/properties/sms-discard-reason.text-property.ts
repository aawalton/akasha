import type { TextProperty } from "@akasha/pages-system/text-property"

export type SmsDiscardReason = string

export const smsDiscardReason = {
  id: "01a06861-e7cd-7414-9760-f421f5fffe5f",
  pageTypeSlug: "text-property",
  slug: "sms-discard-reason",
  propertySlug: "reason",
  definition: "why the message was thrown away",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
