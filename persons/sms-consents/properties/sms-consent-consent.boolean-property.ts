import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const smsConsentConsent = {
  id: "01a06861-e7cd-7fa3-bc44-0cc96b8123c5",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "sms-consent-consent",
  propertySlug: "consent",
  definition: "whether the person agreed",
  types: "ts",
} as const satisfies BooleanProperty
