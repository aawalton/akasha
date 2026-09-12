import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleDelete = {
  id: "01a0603c-c1d7-71ff-becd-5055afe65a24",
  type: "command",
  slug: "temper-inventory-rule-delete",
  definition: "the command taking away a category rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked category rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "The id is said as a word and going on past the lock at its flag.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying no id is refused though it says to go on past the lock.",
    },
    {
      invariantKind: "departure",
      statement: "A flag this takes none of is refused, naming both the ways this is said.",
    },
    {
      invariantKind: "departure",
      statement: "Going on past the lock carries no value, so a value joined to it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A `--` makes even a flag this does take the id rather than that flag.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
  name: "delete",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
