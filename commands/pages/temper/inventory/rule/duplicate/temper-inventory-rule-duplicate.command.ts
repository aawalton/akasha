import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleDuplicate = {
  id: "01a0603c-c1d7-79c4-89bc-1293587ca4fc",
  type: "command",
  slug: "temper-inventory-rule-duplicate",
  definition: "the command copying a category rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The copy is unlocked.",
    },
    {
      invariantKind: "departure",
      statement: "The id is said as a word rather than at its flag.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      invariantKind: "departure",
      statement: "A `--` makes the word after it the id rather than a flag this takes none of.",
    },
    {
      invariantKind: "departure",
      statement: "One rule is copied, so words past the id are all named in one refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The copy is inactive.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
  name: "duplicate",
  arguments: [{ argument: "argument/category-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
