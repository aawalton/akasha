import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleCreate = {
  id: "01a0603c-c1cf-7f09-859a-70e4e6aaa5e3",
  type: "command",
  slug: "temper-inventory-buy-rule-create",
  definition: "the command adding a buy rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A new buy rule is inactive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
  ],
  name: "create",
  arguments: [
    { argument: "argument/title" },
    { argument: "argument/notes" },
    { argument: "argument/goal" },
    { argument: "argument/active" },
    { argument: "argument/item-id" },
    { argument: "argument/item-name" },
    { argument: "argument/target-quantity", required: true },
    { argument: "argument/source" },
  ],
} as const satisfies Command
