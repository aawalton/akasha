import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionFormulaEvaluator = {
  id: "01a06152-c2c8-7842-b7a4-49754c4f6418",
  type: "page-type/module",
  slug: "companion-formula-evaluator",
  definition: "the number a companion metric's formula tree works out to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Arithmetic nodes are delegated to a shared framework evaluator.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An arithmetic node reaching the leaf evaluator throws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A metric reference missing from the value map is refused, naming both the formula and that metric.",
    },
  ],
} as const satisfies Module
