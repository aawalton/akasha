import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleUpdate = {
  id: "01a0603c-c1d9-7f77-bcad-d46ad5150baa",
  type: "command",
  slug: "temper-inventory-rule-update",
  definition: "the command changing the fields of a category rule named by its id",
  code: "ts",
  taking: [
    {
      said: "--destination-chain <json>",
      takes: "the cascade of destinations the item falls through",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked category rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
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
    { argument: "argument/stock-scope" },
    { argument: "argument/category" },
    { argument: "argument/conditions" },
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
