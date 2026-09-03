import type { EmailAddressProperty } from "@akasha/pages-system/email-address-property"

export type RelationshipEmail = string

export const relationshipEmail = {
  id: "01a06594-c6e2-7bfe-9351-b6cd1e77c186",
  pageTypeSlug: "email-address-property",
  slug: "relationship-email",
  propertySlug: "relationship-email",
  definition: "the address Alan writes to this person at",
} as const satisfies EmailAddressProperty
