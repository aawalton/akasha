import type { EmailAddressProperty } from "akasha/pages/email-address-properties/email-address-property.page-type.types.ts"

export type EmailAddress = string

export const emailAddress = {
  id: "01a05362-e8f6-79ac-a787-5d06f4d26808",
  pageTypeSlug: "email-address-property",
  type: "email-address-property",
  slug: "email-address",
  propertySlug: "email",
  definition: "the address a person or a persona sends and receives mail at",
} as const satisfies EmailAddressProperty
