import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const externalIdentityReading = {
  id: "01a09bf4-84e9-7269-b76b-4b3efbc8d34a",
  type: "module",
  slug: "external-identity-reading",
  definition: "what one provider calls a collection, read off and folded into its records",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record is found by the provider that record names.",
    },
    {
      invariantKind: "departure",
      statement: "A collection stating no record of that provider answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A field the record leaves out answers with nothing rather than with empty text.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is no list of records is read as no record at all.",
    },
    {
      invariantKind: "departure",
      statement: "A fresh record writes over the record the same provider held.",
    },
    {
      invariantKind: "departure",
      statement: "A fresh record leaves every other provider's record as that record was.",
    },
    {
      invariantKind: "departure",
      statement: "Records are ordered by the provider each one names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or a page's body.",
    },
  ],
} as const satisfies Module
