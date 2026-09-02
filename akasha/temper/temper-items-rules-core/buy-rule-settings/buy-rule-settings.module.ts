import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buyRuleSettings = {
  id: "01a06100-3be3-78c1-9ab2-bfad6e349dd6",
  pageTypeSlug: "module",
  slug: "buy-rule-settings",
  definition:
    "each way an agent adds, changes, locks, copies or takes away a buy rule in the saved set",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked buy rule is changed by nothing until the lock comes off.",
    },
    {
      invariantKind: "departure",
      statement: "A buy rule copied takes a new id.",
    },
    {
      invariantKind: "departure",
      statement: "Every change stamps the buy rule with the moment of the change.",
    },
  ],
} as const satisfies Module
