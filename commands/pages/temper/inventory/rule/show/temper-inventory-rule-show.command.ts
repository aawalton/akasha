import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleShow = {
  id: "01a0603c-c1d8-7a9c-b7d3-8fab0e6c8abf",
  type: "command",
  slug: "temper-inventory-rule-show",
  definition: "the command giving back one category rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules a person wrote are looked in before the controlled ones.",
    },
    {
      invariantKind: "departure",
      statement: "The id is said as a word and both shape flags at their own.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      invariantKind: "departure",
      statement: "A flag this takes none of is refused, naming the three ways this is said.",
    },
    {
      invariantKind: "departure",
      statement: "Both shape flags carry no value, so a value joined to either is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A shape flag said twice is refused rather than read once.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--json` is declared, so it is taken rather than refused as one this takes none of.",
    },
    {
      invariantKind: "departure",
      statement: "A controlled rule's id is `controlled:` and what that rule was worked out from.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The rule is answered as JSON whether or not `--json` is said, so `--json` changes nothing.",
    },
    {
      invariantKind: "stopgap",
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
