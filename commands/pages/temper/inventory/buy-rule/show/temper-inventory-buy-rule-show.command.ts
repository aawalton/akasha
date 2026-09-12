import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleShow = {
  id: "01a0603c-c1d1-7af1-a8ec-2f502e0eb1db",
  type: "command",
  slug: "temper-inventory-buy-rule-show",
  definition: "the command giving back one buy rule named by its id",
  code: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement: "An id no buy rule has refuses the call.",
    },
  ],
  name: "show",
  arguments: [
    { argument: "argument/tsv" },
    { argument: "argument/buy-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
