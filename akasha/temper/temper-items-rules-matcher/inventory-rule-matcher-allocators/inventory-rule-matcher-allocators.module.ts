import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcherAllocators = {
  id: "01a06151-370c-7272-8296-63a93f40a850",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher-allocators",
  definition: "how many of a matched item a rule takes, and what the allocation is charged against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An allocation is charged against the character the allocation is meant for.",
    },
    {
      invariantKind: "departure",
      statement: "A rule takes no more of an item than the rule asked for.",
    },
  ],
} as const satisfies Module
