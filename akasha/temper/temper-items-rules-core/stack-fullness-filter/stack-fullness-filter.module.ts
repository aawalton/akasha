import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stackFullnessFilter = {
  id: "01a06100-3bfd-71eb-8e28-95fa17ca5dfc",
  pageTypeSlug: "module",
  slug: "stack-fullness-filter",
  definition: "the Stack Fullness condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `stackFullness` condition alone.",
    },
  ],
} as const satisfies Module
