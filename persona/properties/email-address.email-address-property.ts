import type { EmailAddressProperty } from "akasha/page/email-address-property/email-address-property.page-type.types.ts"

export const emailAddress = {
  id: "01a05362-e8f6-79ac-a787-5d06f4d26808",
  type: "page-type/email-address-property",
  slug: "email-address",
  propertySlug: "email",
  definition: "a person's or a persona's mail address",
  types: "ts",
} as const satisfies EmailAddressProperty
