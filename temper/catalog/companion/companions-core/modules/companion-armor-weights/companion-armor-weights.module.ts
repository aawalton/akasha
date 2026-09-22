import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionArmorWeights = {
  id: "01a06108-0763-7147-bd41-21baa914acb5",
  type: "page-type/module",
  slug: "companion-armor-weights",
  definition: "the weight classes of a companion's body armor",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This module names the armor weights without naming any order among the armor weights.",
    },
  ],
} as const satisfies Module
