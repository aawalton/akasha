import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const smsConsentIpAddress = {
  id: "01a06861-e7cd-7635-bf50-9e91c4dffbfa",
  type: "page-type/text-property",
  slug: "sms-consent-ip-address",
  propertySlug: "ip-address",
  definition: "the agreement's sending address",
  maxLength: 45,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
