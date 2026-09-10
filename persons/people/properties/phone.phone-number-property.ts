import type { PhoneNumberProperty } from "akasha/pages/phone-number-properties/phone-number-property.page-type.types.ts"

export type Phone = string

export const phone = {
  id: "01a053e9-be09-72ca-9b1b-117a48a04491",
  pageTypeSlug: "phone-number-property",
  type: "phone-number-property",
  slug: "phone",
  propertySlug: "phone",
  definition: "the number a person or a persona is reached at",
} as const satisfies PhoneNumberProperty
