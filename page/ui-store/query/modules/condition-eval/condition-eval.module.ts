import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const conditionEval = {
  id: "01a05b69-454c-7ec3-ba3c-2370dee03d6a",
  type: "module",
  slug: "condition-eval",
  definition: "whether one page row satisfies a query condition",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A condition on a path holds where some value that path reaches holds it.",
    },
    {
      invariantKind: "departure",
      statement: "A value a path reaches is weighed as the one value a row carries under a key.",
    },
    {
      invariantKind: "departure",
      statement: "A path reaching no value is weighed as a key carrying nothing.",
    },
  ],
} as const satisfies Module
