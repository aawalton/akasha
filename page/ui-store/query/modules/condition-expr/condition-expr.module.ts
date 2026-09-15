import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const conditionExpr = {
  id: "01a05b69-454d-7b7a-b33e-c2de2e06ae06",
  type: "module",
  slug: "condition-expr",
  definition: "a query condition written as an expression the collection runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition on a path is written as no expression and is weighed over the rows.",
    },
  ],
} as const satisfies Module
