import type { PhoneNumberProperty } from "akasha/page/phone-number-property/phone-number-property.page-type.types.ts"

export const phone = {
  id: "01a053e9-be09-72ca-9b1b-117a48a04491",
  type: "page-type/phone-number-property",
  slug: "phone",
  propertySlug: "phone",
  definition: "a person's or a persona's number",
  types: "ts",
} as const satisfies PhoneNumberProperty
