import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryItemRuleDuplicate = {
  id: "01a0603c-c1d3-7aad-9ae3-451fe2454676",
  type: "page-type/command",
  slug: "temper-inventory-item-rule-duplicate",
  definition: "the command copying a per-item rule named by its id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The copy is unlocked.",
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
      statement: "One rule is copied, so words past the id are all named in one refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The copy is inactive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "duplicate",
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
