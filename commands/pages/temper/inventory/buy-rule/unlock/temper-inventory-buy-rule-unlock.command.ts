import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleUnlock = {
  id: "01a0603c-c1d1-7388-9210-2b06caa8d25f",
  type: "command",
  slug: "temper-inventory-buy-rule-unlock",
  definition: "the command unlocking a buy rule named by its id",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unlocking a buy rule already unlocked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule has refuses the call.",
    },
  ],
  name: "unlock",
  arguments: [{ argument: "argument/buy-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
