import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonLines = {
  id: "01a06867-e5ed-7136-848d-0f062a3b65e9",
  pageTypeSlug: "module",
  slug: "monarch-amazon-lines",
  definition: "the Amazon movements in our copy that are still waiting for a note",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement is Amazon's where the merchant name says so.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row already carrying a note is passed over, because a note is written only where none stands.",
    },
    {
      invariantKind: "departure",
      statement: "Rows before the day this project began reading Amazon are passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which direction is wanted is asked of the caller, so charges and refunds draw from one reader.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Gmail or Monarch.",
    },
  ],
} as const satisfies Module
