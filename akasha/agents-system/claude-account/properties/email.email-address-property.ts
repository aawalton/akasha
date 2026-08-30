import type { EmailAddressProperty } from "../../../pages-system/email-address-property/email-address-property.page-type.ts"

export type Email = string

export const email = {
  id: "01a054d8-1d39-7b7f-990d-2112f2ff6a4d",
  pageTypeSlug: "email-address-property",
  slug: "email",
  propertySlug: "email",
  definition: "the address the account signs in as",
} as const satisfies EmailAddressProperty
