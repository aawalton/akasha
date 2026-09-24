import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesEvalAllocation = {
  id: "01a06258-b532-7d68-85f1-0c0a81bc867f",
  type: "page-type/module",
  slug: "inventory-rules-eval-allocation",
  definition: "how a use action is split across characters, along the stock chain the rule names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The characters a by-priority leg takes are those in priority its eligibility passes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no priority compiled, the current character is the one character a leg takes.",
    },
  ],
} as const satisfies Module
