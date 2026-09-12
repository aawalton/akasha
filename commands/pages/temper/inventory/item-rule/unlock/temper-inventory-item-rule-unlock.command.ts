import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleUnlock = {
  id: "01a0603c-c1d4-7ce4-89db-b0f353aba838",
  type: "command",
  slug: "temper-inventory-item-rule-unlock",
  definition: "the command unlocking a per-item rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unlocking a per-item rule already unlocked changes nothing.",
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
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "unlock",
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
