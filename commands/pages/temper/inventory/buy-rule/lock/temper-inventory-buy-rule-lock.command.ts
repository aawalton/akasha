import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleLock = {
  id: "01a0603c-c1d0-727d-9e10-7b3b2d6bec58",
  type: "command",
  slug: "temper-inventory-buy-rule-lock",
  definition: "the command locking a buy rule named by its id",
  code: "ts",
  changeKind: "change-none",
  taking: [{ said: "<id>", takes: "the id of the buy rule locked" }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A locked buy rule is refused an update or a deletion unless that call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "Locking a buy rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule has refuses the call.",
    },
  ],
} as const satisfies Command
