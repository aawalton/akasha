import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleCreate = {
  id: "01a0603c-c1d2-7d8e-8802-6f8e11eb0f2f",
  type: "command",
  slug: "temper-inventory-item-rule-create",
  definition: "the command adding a per-item rule",
  code: "ts",
  taking: [
    { said: "--item-id <n>", takes: "the game item id the rule matches on" },
    {
      said: "--item-name <s>",
      takes: "the item's display name, where the id remains what it matches on",
    },
    { said: "--stock-quantity <n>", takes: "how many the destination is stocked up to" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A new per-item rule is inactive.",
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
    { argument: "argument/action" },
    { argument: "argument/destination" },
    { argument: "argument/stock-scope" },
  ],
} as const satisfies Command
