import type { EmailAddressProperty } from "akasha/page/email-address-property/email-address-property.page-type.types.ts"

export const relationshipEmail = {
  id: "01a06594-c6e2-7bfe-9351-b6cd1e77c186",
  type: "page-type/email-address-property",
  slug: "relationship-email",
  propertySlug: "email",
  definition: "this person's email address",
  types: "ts",
  createdAt: "2026-09-03T04:44:04.194Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies EmailAddressProperty
