import type { PhoneNumberProperty } from "@akasha/pages-system/phone-number-property"

export type RelationshipPhone = string

export const relationshipPhone = {
  id: "01a0658a-f4df-7f05-b945-a9f059bdbdc4",
  pageTypeSlug: "phone-number-property",
  slug: "relationship-phone",
  propertySlug: "relationship-phone",
  definition: "the number Alan reaches this person on",
} as const satisfies PhoneNumberProperty
