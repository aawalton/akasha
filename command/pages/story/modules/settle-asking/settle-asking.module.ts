import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleAsking = {
  id: "01a0e9ee-b5f2-7312-a0d8-7655c24d47a2",
  type: "page-type/module",
  slug: "settle-asking",
  definition: "the changes a settled roll asks of its turn and of the pages its answer adds to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is appended to the outcomes beside its turn as one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer stating `endsAt` has that instant stated on the turn as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating no `endsAt` gains it as its last key, where a turn keeps it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating that instant already is asked nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What an answer adds to one number on a page is summed, and that number restated once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no such number gains what is added as that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A later line of a check rolling nothing replaces its earlier line for the same `character`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line another replaces counts for nothing to any reader of the outcomes.",
    },
  ],
} as const satisfies Module
