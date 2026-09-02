import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcher = {
  id: "01a06151-370d-7de2-bef2-fe7d3f33567a",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher",
  definition: "every item each rule affects, found by trying the compiled rules over the holdings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item is taken by the first rule the item matches.",
    },
    {
      invariantKind: "departure",
      statement: "What one rule leaves over is offered to the rule below.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose rules are unchanged answers from the cache.",
    },
  ],
} as const satisfies Module
