import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleLock = {
  id: "01a0603c-c1d3-7b21-8e7e-1cbbd4192e8b",
  type: "command",
  slug: "temper-inventory-item-rule-lock",
  definition: "the command locking a per-item rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A locked per-item rule is refused an update or a deletion unless that call says `--force`.",
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
      statement: "Locking a per-item rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "lock",
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
