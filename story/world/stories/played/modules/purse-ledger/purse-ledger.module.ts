import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const purseLedger = {
  id: "01a0fd32-7227-7ce7-b19b-4560c294eb53",
  type: "page-type/module",
  slug: "purse-ledger",
  definition: "a purse's changes turn by turn, read off its history for the turns already played",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A ledger is keyed by its purse's name, as the purse is on the sheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ledger holds a line for each turn its purse's history changed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is counted in the purse's currency, largest coins first, as the purse is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names its turn, what was gained or spent, and what the purse then held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ledger leaves out every line after the turn the sheet is drawn for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newest line comes first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse shown in words has no ledger, so no number behind those words is shown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
} as const satisfies Module
