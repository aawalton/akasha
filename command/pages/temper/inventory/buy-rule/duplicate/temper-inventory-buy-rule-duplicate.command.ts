import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryBuyRuleDuplicate = {
  id: "01a0603c-c1cf-724f-8dcf-c1faa571392d",
  type: "page-type/command",
  slug: "temper-inventory-buy-rule-duplicate",
  definition: "the command copying a buy rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The copy is unlocked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The id is said as a word rather than at its flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no id is refused, asking for the id by its placeholder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `--` makes the word after it the id rather than a flag this takes none of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One rule is copied, so words past the id are all named in one refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The copy is inactive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id no buy rule has refuses the call.",
    },
  ],
  name: "duplicate",
  arguments: [{ argument: "argument/buy-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
