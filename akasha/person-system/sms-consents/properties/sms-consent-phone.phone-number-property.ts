import type { PhoneNumberProperty } from "@akasha/pages-system/phone-number-property"

export type SmsConsentPhone = string

export const smsConsentPhone = {
  id: "01a06861-e7cd-759b-b0b0-dea045fcc167",
  pageTypeSlug: "phone-number-property",
  slug: "sms-consent-phone",
  propertySlug: "phone",
  definition: "the number the person agreed to be reached on",
} as const satisfies PhoneNumberProperty
