import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleLock = {
  id: "01a0603c-c1d7-740c-ba2b-29b12244bd79",
  type: "command",
  slug: "temper-inventory-rule-lock",
  definition: "the command locking a category rule named by its id",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A locked category rule is refused an update, a move or a deletion unless that call says `--force`.",
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
