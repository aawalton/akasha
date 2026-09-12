import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleList = {
  id: "01a0603c-c1d3-7fdf-bf4e-51b3a559a428",
  type: "command",
  slug: "temper-inventory-item-rule-list",
  definition: "the command naming every per-item rule",
  code: "ts",
  taking: [{ said: "--json", takes: "give the rules as JSON rather than as tab-separated rows" }],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules are given in the order the settings have.",
    },
  ],
  name: "list",
} as const satisfies Command
