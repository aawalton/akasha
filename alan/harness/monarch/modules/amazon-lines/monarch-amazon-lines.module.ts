import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAmazonLines = {
  id: "01a06867-e5ed-7136-848d-0f062a3b65e9",
  type: "page-type/module",
  slug: "monarch-amazon-lines",
  definition: "how code finds each Amazon Monarch transaction that has no note",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement is Amazon's where the merchant name says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row already carrying a note is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows before the day this project began reading Amazon are passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which direction is wanted is asked of the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Gmail or Monarch.",
    },
  ],
  createdAt: "2026-09-03T17:53:54.669Z",
  updatedAt: "2026-10-30T15:43:38.338Z",
} as const satisfies Module
