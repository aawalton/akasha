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
  ],
  createdAt: "2026-09-02T13:39:35.850Z",
  updatedAt: "2026-10-28T20:47:31.599Z",
} as const satisfies Module
