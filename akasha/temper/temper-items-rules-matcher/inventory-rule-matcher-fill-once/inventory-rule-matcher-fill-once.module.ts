import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcherFillOnce = {
  id: "01a06151-370d-70a8-a87f-8418ae7034ba",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher-fill-once",
  definition: "a rule filling a character or a companion once, rather than once for each item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character already filled by this rule takes nothing further.",
    },
  ],
} as const satisfies Module
