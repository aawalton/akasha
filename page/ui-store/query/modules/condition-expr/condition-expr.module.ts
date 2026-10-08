import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const conditionExpr = {
  id: "01a05b69-454d-7b7a-b33e-c2de2e06ae06",
  type: "page-type/module",
  slug: "condition-expr",
  definition: "a query condition written as an expression the collection runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition on a path is written as no expression and is weighed over the rows.",
    },
  ],
  createdAt: "2026-09-01T05:20:20.813Z",
  updatedAt: "2026-09-15T18:36:37.000Z",
} as const satisfies Module
