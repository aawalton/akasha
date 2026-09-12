import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleTakes = {
  id: "01a0959d-e8ec-72b0-95be-efffc8405b8a",
  type: "command",
  slug: "temper-inventory-rule-takes",
  definition: "the command naming the items one category rule takes and what takes the rest",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The items named are the ones the rule takes where every rule above it has run.",
    },
    {
      invariantKind: "departure",
      statement: "An item the rule would take alone and does not take here is named as shadowed.",
    },
    {
      invariantKind: "departure",
      statement: "A shadowed item names the first rule above this one that takes it.",
    },
    {
      invariantKind: "departure",
      statement: "The items are gathered by the item they are, rather than by the stack.",
    },
    {
      invariantKind: "departure",
      statement: "An id no rule the addon compiled carries refuses the call.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the rule store, so a rule is named by its id rather than its title.",
    },
  ],
  name: "takes",
  arguments: [
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
  ],
} as const satisfies Command
