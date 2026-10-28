import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const correctOutcomes = {
  id: "01a1832c-ec75-723f-aa4b-572499a1d90a",
  type: "page-type/module",
  slug: "correct-outcomes",
  definition: "the outcome lines a correction checks its beat's marks against, and replaces",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change setting a key an outcome adds to is refused unless marked with its line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line the beat's old or new changes mark must be met by the turn's changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Outcome lines handed in are checked in place of the turn's own.",
    },
  ],
  createdAt: "2026-10-28T15:42:01.844Z",
  updatedAt: "2026-10-28T15:42:01.844Z",
} as const satisfies Module
