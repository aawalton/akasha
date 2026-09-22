import type { PhoneNumberProperty } from "akasha/page/phone-number-property/phone-number-property.page-type.types.ts"

export const telnyxAccountFromNumber = {
  id: "01a06861-e7cd-782f-837c-97ecffc8dfca",
  type: "page-type/phone-number-property",
  slug: "telnyx-account-from-number",
  propertySlug: "from-number",
  definition: "the number that sends a text",
  types: "ts",
} as const satisfies PhoneNumberProperty
