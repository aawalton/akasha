import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryBuyRuleList = {
  id: "01a0603c-c1d0-7e92-8585-751f1a226c8f",
  type: "page-type/command",
  slug: "temper-inventory-buy-rule-list",
  definition: "the command naming every buy rule beside how far short of its target it falls",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rule has the quantity held now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account the quantity is read from is Alan's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rule has the shortfall against its target.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
