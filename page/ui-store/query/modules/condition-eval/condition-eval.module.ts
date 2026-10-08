import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const conditionEval = {
  id: "01a05b69-454c-7ec3-ba3c-2370dee03d6a",
  type: "page-type/module",
  slug: "condition-eval",
  definition: "whether a page row satisfies a query condition",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition on a path holds where some value that path reaches holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a path reaches is weighed as the one value a row carries under a key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path reaching no value is weighed as a key carrying nothing.",
    },
  ],
  createdAt: "2026-09-01T05:20:20.812Z",
  updatedAt: "2026-09-22T10:05:52.000Z",
} as const satisfies Module
