import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SmsConsentUserAgent = string

export const smsConsentUserAgent = {
  id: "01a06861-e7cd-7534-838b-db51ab94d8df",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "sms-consent-user-agent",
  propertySlug: "user-agent",
  definition: "the browser the agreement was sent from",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
