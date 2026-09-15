import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryItemRuleUnlock = {
  id: "01a0603c-c1d4-7ce4-89db-b0f353aba838",
  type: "page-type/command",
  slug: "temper-inventory-item-rule-unlock",
  definition: "the command unlocking a per-item rule named by its id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Unlocking a per-item rule already unlocked changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id is said as a word rather than at its flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `--` makes the word after it the id rather than a flag this takes none of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words this takes none of are all named in one refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "unlock",
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
