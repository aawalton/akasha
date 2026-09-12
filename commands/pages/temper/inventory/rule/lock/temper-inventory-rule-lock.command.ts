import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleLock = {
  id: "01a0603c-c1d7-740c-ba2b-29b12244bd79",
  type: "command",
  slug: "temper-inventory-rule-lock",
  definition: "the command locking a category rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A locked category rule is refused an update, a move or a deletion unless that call says `--force`.",
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
      statement: "Words this takes none of are all named in one refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Locking a category rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
  name: "lock",
  arguments: [{ argument: "argument/category-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
