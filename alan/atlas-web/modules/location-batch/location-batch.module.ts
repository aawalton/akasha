import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationBatch = {
  id: "01a06582-6b30-7821-aec9-e664610f024b",
  type: "page-type/module",
  slug: "location-batch",
  definition: "the shape of a batch of captured location points",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch is judged a batch before any point in it is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each point in a batch is kept or refused alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused point is named by its place in the batch and why it was refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer names the refused points only where there are some.",
    },
  ],
} as const satisfies Module
