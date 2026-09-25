import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageWaiting = {
  id: "01a0d6d3-a87f-73ad-a503-548456a4aec6",
  type: "page-type/module",
  slug: "page-waiting",
  definition: "the wait a read makes for the calling agent's own page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent whose page is already there asks for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent with no page asks for that page back once, before the wait begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The asking is handed in so a test spawns nothing.",
    },
  ],
} as const satisfies Module
