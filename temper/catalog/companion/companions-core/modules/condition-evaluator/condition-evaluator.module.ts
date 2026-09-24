import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const conditionEvaluator = {
  id: "01a06152-c2d9-7bfd-bdcf-e47f851e9b16",
  type: "page-type/module",
  slug: "condition-evaluator",
  definition: "how a companion skill's conditions are resolved during a rotation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An unrecognised condition type is treated as satisfied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A health threshold's uptime is estimated from the enemy's starting health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Health-threshold conditions are the only kind contributing to the effective multiplier.",
    },
  ],
} as const satisfies Module
