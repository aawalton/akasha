import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCurrency = {
  id: "01a06258-b52a-7942-8b11-daff55c0534e",
  type: "page-type/module",
  slug: "inventory-currency",
  definition:
    "reading a character's, the bank's and the account's currencies into the saved database",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The currencies read are written from the currency pages as the addon compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A currency is read by the game constant its page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant the running game does not define is skipped.",
    },
  ],
} as const satisfies Module
