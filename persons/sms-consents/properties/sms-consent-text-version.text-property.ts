import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const smsConsentTextVersion = {
  id: "01a06861-e7cd-7520-8e15-5ac92bd8de01",
  type: "text-property",
  slug: "sms-consent-text-version",
  propertySlug: "consent-text-version",
  definition: "which wording of the agreement the person was shown",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
