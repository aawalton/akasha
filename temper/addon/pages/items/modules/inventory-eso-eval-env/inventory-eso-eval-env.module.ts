import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryEsoEvalEnv = {
  id: "01a06258-b52a-73ae-8e70-29b3bb5beb50",
  type: "page-type/module",
  slug: "inventory-eso-eval-env",
  definition: "the evaluation environment the rule evaluator runs in, built from game state",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line rank table is built on the first lookup that asks for one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house's room comes from the house the saved database last scanned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What the character playing wears is read from the game, and another's from its scan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build a character is set up as is the one chosen in the game, where one was.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.850Z",
  updatedAt: "2026-11-01T19:01:52.055Z",
} as const satisfies Module
