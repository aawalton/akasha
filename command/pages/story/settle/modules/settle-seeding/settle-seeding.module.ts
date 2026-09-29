import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleSeeding = {
  id: "01a0eb3c-d621-7de5-b714-a2872da4c451",
  type: "page-type/module",
  slug: "settle-seeding",
  definition: "the seed a settled roll is rolled from",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seed hashes the line before, the turn, the roll's place there and how often the turn was unmade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is unmade by each commit taking away its page or its outcomes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rewind and a take-back each unmake a turn, so a turn made again rolls afresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn never unmade is seeded as if the count were not there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roll with no line before it, on a turn never unmade, is seeded by its turn's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each ingredient of a seed is read from what the repository records.",
    },
  ],
} as const satisfies Module
