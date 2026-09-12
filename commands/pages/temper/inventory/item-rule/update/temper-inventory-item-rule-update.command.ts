import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleUpdate = {
  id: "01a0603c-c1d4-7ad6-becc-0e7bd28a0a09",
  type: "command",
  slug: "temper-inventory-item-rule-update",
  definition: "the command changing the fields of a per-item rule named by its id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked per-item rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "update",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/title" },
    { argument: "argument/notes" },
    { argument: "argument/goal" },
    { argument: "argument/active" },
    { argument: "argument/action" },
    { argument: "argument/destination" },
    { argument: "argument/stock-quantity" },
    { argument: "argument/item-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
