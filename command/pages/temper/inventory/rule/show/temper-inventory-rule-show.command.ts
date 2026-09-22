import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryRuleShow = {
  id: "01a0603c-c1d8-7a9c-b7d3-8fab0e6c8abf",
  type: "page-type/command",
  slug: "temper-inventory-rule-show",
  definition: "the command giving back a category rule named by its id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rules a person wrote are looked in before the controlled ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id is said as a word and both shape flags at their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag this takes none of is refused, naming the three ways this is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both shape flags carry no value, so a value joined to either is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape flag said twice is refused rather than read once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`--json` is declared, so it is taken rather than refused as one this takes none of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A controlled rule's id is `controlled:` and what that rule was worked out from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id no category rule carries refuses the call.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The rule is answered as JSON whether or not `--json` is said, so `--json` changes nothing.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "`--tsv` is the flag choosing the shape of this answer.",
    },
  ],
  name: "show",
  arguments: [
    { argument: "argument/tsv" },
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
    { argument: "argument/json" },
  ],
} as const satisfies Command
