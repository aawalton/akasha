import type { PhoneNumberProperty } from "@akasha/pages-system/phone-number-property"

export type TelnyxAccountFromNumber = string

export const telnyxAccountFromNumber = {
  id: "01a06861-e7cd-782f-837c-97ecffc8dfca",
  pageTypeSlug: "phone-number-property",
  slug: "telnyx-account-from-number",
  propertySlug: "from-number",
  definition: "the number a text is sent from",
} as const satisfies PhoneNumberProperty
