import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionCatalog = {
  id: "01a0cac0-8ed4-775f-b90e-131cec257453",
  type: "page-type/module",
  slug: "companion-catalog",
  definition:
    "the companion skills and skill lines the pages hold, kept for a reader that cannot wait",
  code: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalogue is read once and kept, rather than read again on every question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser is handed the catalogue its server already read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Asking for the catalogue before it is read is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That refusal is a raise of its own, so a reader catching bad data does not swallow it.",
    },
  ],
} as const satisfies Module
