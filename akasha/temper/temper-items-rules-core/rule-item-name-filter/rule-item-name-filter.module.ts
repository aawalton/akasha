import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleItemNameFilter = {
  id: "01a06100-3bfb-715d-9402-fe6ea7cf271f",
  pageTypeSlug: "module",
  slug: "rule-item-name-filter",
  definition: "the Item Name condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `itemNamePattern` condition alone.",
    },
  ],
} as const satisfies Module
