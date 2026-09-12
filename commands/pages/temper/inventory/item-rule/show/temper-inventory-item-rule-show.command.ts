import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleShow = {
  id: "01a0603c-c1d4-7e72-bcc5-fb55fe3c992c",
  type: "command",
  slug: "temper-inventory-item-rule-show",
  definition: "the command giving back one per-item rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The id is said as a word and the answer's shape at its flag.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      invariantKind: "departure",
      statement: "A flag this takes none of is refused, naming both the ways this is said.",
    },
    {
      invariantKind: "departure",
      statement: "The answer's shape carries no value, so a value joined to it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The answer's shape said twice is refused rather than read once.",
    },
  ],
  name: "show",
  arguments: [
    { argument: "argument/tsv" },
    { argument: "argument/item-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
