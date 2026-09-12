import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleReorder = {
  id: "01a0603c-c1d8-70b7-a1e7-d602bcd411b0",
  type: "command",
  slug: "temper-inventory-rule-reorder",
  definition: "the command moving a category rule to another place in the priority order",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no way of placing the rule is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming more than one way of placing the rule is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The position is counted over the rules a person wrote.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor id no rule carries refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A locked rule is refused unless the call says `--force`.",
    },
  ],
  name: "reorder",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
    {
      argument: "argument/to-position",
      notWith: ["argument/before", "argument/after"],
    },
    { argument: "argument/before", notWith: ["argument/after"] },
    { argument: "argument/after" },
  ],
} as const satisfies Command
