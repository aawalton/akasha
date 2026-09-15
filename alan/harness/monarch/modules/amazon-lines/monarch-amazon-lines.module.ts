import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAmazonLines = {
  id: "01a06867-e5ed-7136-848d-0f062a3b65e9",
  type: "page-type/module",
  slug: "monarch-amazon-lines",
  definition: "the Amazon movements in our copy that are still waiting for a note",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A movement is Amazon's where the merchant name says so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row already carrying a note is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows before the day this project began reading Amazon are passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which direction is wanted is asked of the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches Gmail or Monarch.",
    },
  ],
} as const satisfies Module
