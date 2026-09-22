import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accountDisplayName = {
  id: "01a0680a-1a00-7002-9c37-8a1d4e6f1103",
  type: "page-type/text-property",
  slug: "account-display-name",
  propertySlug: "account-display-name",
  definition: "the name and masked number a statement gives an account",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A display name has the last four digits the bank shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two accounts share a display name where the bank reopened an account under a new id.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
