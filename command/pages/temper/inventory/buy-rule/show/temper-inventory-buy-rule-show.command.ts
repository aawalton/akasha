import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryBuyRuleShow = {
  id: "01a0603c-c1d1-7af1-a8ec-2f502e0eb1db",
  type: "page-type/command",
  slug: "temper-inventory-buy-rule-show",
  definition: "the command giving back a buy rule named by its id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An id no buy rule has refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id is said as a word and the answer's shape at its flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag this takes none of is refused, naming both the ways this is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer's shape carries no value, so a value joined to it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer's shape said twice is refused rather than read once.",
    },
  ],
  name: "show",
  arguments: [
    { argument: "argument/tsv" },
    { argument: "argument/buy-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
