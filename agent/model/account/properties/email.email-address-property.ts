import type { EmailAddressProperty } from "akasha/page/email-address-property/email-address-property.page-type.types.ts"

export const email = {
  id: "01a054d8-1d39-7b7f-990d-2112f2ff6a4d",
  type: "page-type/email-address-property",
  slug: "email",
  propertySlug: "email",
  definition: "the name a model account uses to sign in",
  types: "ts",
} as const satisfies EmailAddressProperty
