import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryCategoryList = {
  id: "01a095a3-61d5-77ef-98a6-20d7e3eee889",
  type: "page-type/command",
  slug: "temper-inventory-category-list",
  definition: "the command naming every category open to a rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The categories are given in the order the tree holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The category every item is in comes first and is the parent of every root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How deep a category sits is how far that category is indented.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the holdings, the rules or the game.",
    },
  ],
  name: "category-list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
