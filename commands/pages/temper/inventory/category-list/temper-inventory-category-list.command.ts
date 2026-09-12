import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryCategoryList = {
  id: "01a095a3-61d5-77ef-98a6-20d7e3eee889",
  type: "command",
  slug: "temper-inventory-category-list",
  definition: "the command naming every category a rule may be written against",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The categories are given in the order the tree holds them.",
    },
    {
      invariantKind: "departure",
      statement: "The category every item is in comes first and is the parent of every root.",
    },
    {
      invariantKind: "departure",
      statement: "How deep a category sits is how far that category is indented.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the holdings, the rules or the game.",
    },
  ],
  name: "category-list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
