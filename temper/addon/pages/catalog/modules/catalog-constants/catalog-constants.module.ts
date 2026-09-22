import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogConstants = {
  id: "01a063ba-94e5-7067-b212-ee1558bee77b",
  type: "page-type/module",
  slug: "catalog-constants",
  definition: "the add-on's name and the delays pacing its collection run",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name here is the name the game loads the add-on under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The start delay leaves the game time to settle before the first collector runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collector answering nothing within the timeout is given up on.",
    },
  ],
} as const satisfies Module
