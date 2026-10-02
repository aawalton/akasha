import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedPurses = {
  id: "01a0fd36-850f-7f4f-9c56-119b4eb7fe61",
  type: "page-type/module",
  slug: "played-purses",
  definition: "the purses a story played's character holds, read with their currencies and ledgers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's purses are read with the currencies they name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse's ledger is read off its history for the turn the sheet is drawn for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse stating it is unrevealed is read as no purse and has no ledger.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
