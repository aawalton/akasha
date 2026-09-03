import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type SmsConsentConsent = boolean

export const smsConsentConsent = {
  id: "01a06861-e7cd-7fa3-bc44-0cc96b8123c5",
  pageTypeSlug: "boolean-property",
  slug: "sms-consent-consent",
  propertySlug: "consent",
  definition: "whether the person agreed",
} as const satisfies BooleanProperty
