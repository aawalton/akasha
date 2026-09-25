import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingIndexing = {
  id: "01a0d900-63c2-7fef-a009-23551a4700fd",
  type: "page-type/module",
  slug: "landing-indexing",
  definition: "the index kept level with the bodies a landing writes, takes away and moves",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The index is told the body a landing leaves at each path rather than the body asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repair tells the index the base commit's bodies again.",
    },
  ],
} as const satisfies Module
