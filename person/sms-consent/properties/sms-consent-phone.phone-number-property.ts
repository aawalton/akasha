import type { PhoneNumberProperty } from "akasha/page/phone-number-property/phone-number-property.page-type.types.ts"

export const smsConsentPhone = {
  id: "01a06861-e7cd-759b-b0b0-dea045fcc167",
  type: "page-type/phone-number-property",
  slug: "sms-consent-phone",
  propertySlug: "phone",
  definition: "the person's agreed number",
  types: "ts",
} as const satisfies PhoneNumberProperty
