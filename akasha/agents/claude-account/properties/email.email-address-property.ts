import type { EmailAddressProperty } from "@akasha/pages-system/email-address-property"

export type Email = string

export const email = {
  id: "01a054d8-1d39-7b7f-990d-2112f2ff6a4d",
  pageTypeSlug: "email-address-property",
  slug: "email",
  propertySlug: "email",
  definition: "the address the account signs in as",
} as const satisfies EmailAddressProperty
