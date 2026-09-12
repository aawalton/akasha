import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleCreate = {
  id: "01a0603c-c1d6-798f-a6d9-f51d3fc000f9",
  type: "command",
  slug: "temper-inventory-rule-create",
  definition: "the command adding a category rule",
  code: "ts",
  taking: [
    { said: "--conditions <json>", takes: "the conditions narrowing which items the rule reaches" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A new category rule is inactive.",
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
    { argument: "argument/category" },
  ],
} as const satisfies Command
