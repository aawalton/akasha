import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesGuildBuyCore = {
  id: "01a0e34e-af92-7fc1-898f-8aa21b3524af",
  type: "page-type/module",
  slug: "inventory-rules-guild-buy-core",
  definition: "which guild store listings a rule short of its target buys",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The cheapest listing for one is bought first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing priced above its max price for one is not bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing's max price is the rule's, or else TTC's suggested price for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing with neither price is not bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stack larger than what the rule is still short of is not bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stack costing more than the gold left is not bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Buying nothing names the first check every listing failed.",
    },
  ],
} as const satisfies Module
