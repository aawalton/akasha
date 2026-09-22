import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const smsConsentUserAgent = {
  id: "01a06861-e7cd-7534-838b-db51ab94d8df",
  type: "page-type/text-property",
  slug: "sms-consent-user-agent",
  propertySlug: "user-agent",
  definition: "the browser sending the agreement",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
