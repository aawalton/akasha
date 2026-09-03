import type { TextProperty } from "@akasha/pages-system/text-property"

export type AccountDisplayName = string

export const accountDisplayName = {
  id: "01a0680a-1a00-7002-9c37-8a1d4e6f1103",
  pageTypeSlug: "text-property",
  slug: "account-display-name",
  propertySlug: "account-display-name",
  definition: "the name and masked number a statement calls an account by",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A display name carries the last four digits the bank shows.",
    },
    {
      invariantKind: "departure",
      statement: "Two accounts share a display name where the bank reopened one under a new id.",
    },
  ],
} as const satisfies TextProperty
