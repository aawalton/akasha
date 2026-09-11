import type { EmailAddressProperty } from "akasha/pages/email-address-properties/email-address-property.page-type.types.ts"

export const royalRoadEmail = {
  id: "01a0685d-b81f-79bb-a097-70cc1e0610d2",
  type: "email-address-property",
  slug: "royal-road-email",
  propertySlug: "email",
  definition: "the address a Royal Road account signs in as",
  types: "ts",
} as const satisfies EmailAddressProperty
