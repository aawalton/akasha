import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type SmsDiscardDiscardedAt = string

export const smsDiscardDiscardedAt = {
  id: "01a06861-e7cd-7e27-9dd1-7eadea03bae4",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "sms-discard-discarded-at",
  propertySlug: "discarded-at",
  definition: "when the message was thrown away",
} as const satisfies InstantProperty
