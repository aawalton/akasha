import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const affinityTier = {
  id: "01a0c4fb-81eb-7ca7-8a9b-1e0291769739",
  type: "page-type/module",
  slug: "affinity-tier",
  definition: "the four tiers an affinity climbs, each with the count that fills it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier says how far a climber's influence over the element reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An affinity senses the element, manipulation shapes it, spirit moves it, and soul is it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tier holds a count of its own, which fills to that tier's cap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caps are ten, fifty, two hundred and fifty, and a thousand.",
    },
  ],
} as const satisfies Module
