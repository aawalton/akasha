import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type SmsConsentSubmittedAt = string

export const smsConsentSubmittedAt = {
  id: "01a06861-e7cd-70cd-8483-011f90554dd3",
  pageTypeSlug: "instant-property",
  slug: "sms-consent-submitted-at",
  propertySlug: "submitted-at",
  definition: "when the person agreed",
} as const satisfies InstantProperty
