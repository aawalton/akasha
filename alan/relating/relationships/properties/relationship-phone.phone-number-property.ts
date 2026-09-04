import type { PhoneNumberProperty } from "@akasha/pages-system/phone-number-property"

export type RelationshipPhone = string

export const relationshipPhone = {
  id: "01a06594-c6e2-7f94-94c3-0b50f4d7d8fa",
  pageTypeSlug: "phone-number-property",
  slug: "relationship-phone",
  propertySlug: "relationship-phone",
  definition: "the number Alan reaches this person on",
} as const satisfies PhoneNumberProperty
