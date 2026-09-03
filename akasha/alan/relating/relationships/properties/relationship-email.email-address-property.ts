import type { EmailAddressProperty } from "@akasha/pages-system/email-address-property"

export type RelationshipEmail = string

export const relationshipEmail = {
  id: "01a0658a-f4df-7967-b8a7-a078f341ab25",
  pageTypeSlug: "email-address-property",
  slug: "relationship-email",
  propertySlug: "relationship-email",
  definition: "the address Alan writes to this person at",
} as const satisfies EmailAddressProperty
