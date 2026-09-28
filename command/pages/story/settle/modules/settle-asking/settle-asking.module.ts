import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleAsking = {
  id: "01a0e9ee-b5f2-7312-a0d8-7655c24d47a2",
  type: "page-type/module",
  slug: "settle-asking",
  definition: "the changes a settled roll asks of the turn the roll is settled on",
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
  ],
} as const satisfies Module
