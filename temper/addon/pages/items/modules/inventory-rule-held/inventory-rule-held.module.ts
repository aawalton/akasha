import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleHeld = {
  id: "01a0e315-95ad-766e-95c5-a7a104008d5a",
  type: "page-type/module",
  slug: "inventory-rule-held",
  definition: "what the account holds of the items a stocking rule takes, and the rule's target",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule takes an item where the item's category and the rule's conditions both match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count names the item types it looks at, or looks at every item type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule's target is its stock chain's target for the characters its by-priority leg takes.",
    },
  ],
} as const satisfies Module
