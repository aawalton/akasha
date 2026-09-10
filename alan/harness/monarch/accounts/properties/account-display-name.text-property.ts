import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AccountDisplayName = string

export const accountDisplayName = {
  id: "01a0680a-1a00-7002-9c37-8a1d4e6f1103",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "account-display-name",
  propertySlug: "account-display-name",
  definition: "the name and masked number a statement calls an account by",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A display name has the last four digits the bank shows.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two accounts share a display name where the bank reopened an account under a new id.",
    },
  ],
} as const satisfies TextProperty
