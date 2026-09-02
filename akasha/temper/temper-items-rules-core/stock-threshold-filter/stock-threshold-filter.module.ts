import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stockThresholdFilter = {
  id: "01a06100-3bff-73e7-85b6-9e125fd40021",
  pageTypeSlug: "module",
  slug: "stock-threshold-filter",
  definition: "the Stock Threshold condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `stockThreshold` condition alone.",
    },
  ],
} as const satisfies Module
