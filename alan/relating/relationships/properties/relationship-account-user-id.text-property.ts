import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipAccountUserId = string

export const relationshipAccountUserId = {
  id: "01a06594-c6e2-7a41-b658-712415c18bbe",
  pageTypeSlug: "text-property",
  slug: "relationship-account-user-id",
  propertySlug: "relationship-account-user-id",
  definition: "the account this person signs in with",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
