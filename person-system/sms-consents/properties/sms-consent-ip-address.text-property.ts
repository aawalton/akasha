import type { TextProperty } from "@akasha/pages-system/text-property"

export type SmsConsentIpAddress = string

export const smsConsentIpAddress = {
  id: "01a06861-e7cd-7635-bf50-9e91c4dffbfa",
  pageTypeSlug: "text-property",
  slug: "sms-consent-ip-address",
  propertySlug: "ip-address",
  definition: "the address the agreement was sent from",
  max: 45,
  nameFormatSlug: null,
} as const satisfies TextProperty
