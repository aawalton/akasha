import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipAccountUserId = string

export const relationshipAccountUserId = {
  id: "01a0658a-f4df-7263-b7b1-af6056bd394b",
  pageTypeSlug: "text-property",
  slug: "relationship-account-user-id",
  propertySlug: "relationship-account-user-id",
  definition: "the account this person signs in with",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
