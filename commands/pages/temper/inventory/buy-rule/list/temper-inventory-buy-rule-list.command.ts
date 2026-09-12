import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleList = {
  id: "01a0603c-c1d0-7e92-8585-751f1a226c8f",
  type: "command",
  slug: "temper-inventory-buy-rule-list",
  definition: "the command naming every buy rule beside how far short of its target it falls",
  code: "ts",
  changeKind: "change-none",
  taking: [{ said: "--json", takes: "give each rule as JSON rather than as tab-separated rows" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each rule has the quantity held now.",
    },
    {
      invariantKind: "departure",
      statement: "The account the quantity is read from is Alan's unless `USER_ID` names another.",
    },
    {
      invariantKind: "departure",
      statement: "Each rule has the shortfall against its target.",
    },
  ],
} as const satisfies Command
