import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const movementScoring = {
  id: "01a0685e-89d5-7913-99ff-32aaab2551b8",
  pageTypeSlug: "module",
  slug: "movement-scoring",
  definition: "what a movement is worth against each goal, and blended by the policy's weights",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement is scored from the fields of its own exercise page.",
    },
    {
      invariantKind: "absence",
      statement: "No score is read off a page, so a page states no score.",
    },
    {
      invariantKind: "departure",
      statement: "Each goal is scored between zero and one.",
    },
    {
      invariantKind: "departure",
      statement: "The blend is the weighted mean of the four goals.",
    },
    {
      invariantKind: "departure",
      statement: "Weights summing to nothing blend as though they summed to one.",
    },
    {
      invariantKind: "departure",
      statement: "A field the page leaves out scores as though the trait were absent.",
    },
  ],
} as const satisfies Module
