import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const relationshipAccountUserId = {
  id: "01a06594-c6e2-7a41-b658-712415c18bbe",
  type: "page-type/text-property",
  slug: "relationship-account-user-id",
  propertySlug: "relationship-account-user-id",
  definition: "this person's sign-in account",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
