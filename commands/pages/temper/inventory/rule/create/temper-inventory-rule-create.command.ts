import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleCreate = {
  id: "01a0603c-c1d6-798f-a6d9-f51d3fc000f9",
  type: "command",
  slug: "temper-inventory-rule-create",
  definition: "the command adding a category rule",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A new category rule is inactive.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying neither the action nor the category is refused for both.",
    },
    {
      invariantKind: "departure",
      statement: "The act that adds takes the store rather than reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "Every flag is narrowed before the store is read, so a misspelling reads nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule added is named on the caller's list as soon as that write has gone.",
    },
    {
      invariantKind: "departure",
      statement: "A rule the store would not take is named nowhere, because nothing was written.",
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
    { argument: "argument/action", required: true },
    { argument: "argument/destination" },
    { argument: "argument/stock-scope" },
    { argument: "argument/category", required: true },
    { argument: "argument/conditions" },
  ],
} as const satisfies Command
