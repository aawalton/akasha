import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionFormulaExtraction = {
  id: "01a06152-c2c8-7340-b909-f5fd7c81e388",
  type: "page-type/module",
  slug: "companion-formula-extraction",
  definition: "the damage and healing components into which a companion skill template breaks down",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Trigger frequency is folded into a component's value rather than simulated over time.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A component identifier counts up across one extraction run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Component values are worked out from the stats of the build being scored, which the caller hands in.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.904Z",
  updatedAt: "2026-09-24T23:37:41.000Z",
} as const satisfies Module
