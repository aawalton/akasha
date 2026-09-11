import type { PhoneNumberProperty } from "akasha/pages/phone-number-properties/phone-number-property.page-type.types.ts"

export const telnyxAccountFromNumber = {
  id: "01a06861-e7cd-782f-837c-97ecffc8dfca",
  type: "phone-number-property",
  slug: "telnyx-account-from-number",
  propertySlug: "from-number",
  definition: "the number a text is sent from",
  types: "ts",
} as const satisfies PhoneNumberProperty
