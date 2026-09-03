import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonNotes = {
  id: "01a06867-fdff-7f9c-9aa9-9feb98cf40cb",
  pageTypeSlug: "module",
  slug: "monarch-amazon-notes",
  definition: "the Amazon order confirmations matched to charges and written on as notes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A charge matching two or more orders is abstained on and never written.",
    },
    {
      invariantKind: "departure",
      statement: "A charge matching no order is reported and left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The before-picture of every Amazon row is taken before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is written unless writing was asked for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A single row may be named, and where it is not among the matched ones its live note is reported rather than a match invented.",
    },
    {
      invariantKind: "departure",
      statement: "A message carrying no order number is counted rather than passed over silently.",
    },
    {
      invariantKind: "departure",
      statement:
        "What was written, what was declined and what order numbers were owed are all tallied at the end.",
    },
  ],
} as const satisfies Module
