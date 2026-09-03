import type { TextProperty } from "@akasha/pages-system/text-property"

export type SmsConsentUserAgent = string

export const smsConsentUserAgent = {
  id: "01a06861-e7cd-7534-838b-db51ab94d8df",
  pageTypeSlug: "text-property",
  slug: "sms-consent-user-agent",
  propertySlug: "user-agent",
  definition: "the browser the agreement was sent from",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
