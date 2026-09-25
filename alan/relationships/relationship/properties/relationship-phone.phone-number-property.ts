import type { PhoneNumberProperty } from "akasha/page/phone-number-property/phone-number-property.page-type.types.ts"

export const relationshipPhone = {
  id: "01a06594-c6e2-7f94-94c3-0b50f4d7d8fa",
  type: "page-type/phone-number-property",
  slug: "relationship-phone",
  propertySlug: "relationship-phone",
  definition: "this person's phone number",
  types: "ts",
} as const satisfies PhoneNumberProperty
