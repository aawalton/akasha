import type { Command } from "../../../../../command.page-type.types.ts"

export const temperInventoryBuyRuleLock = {
  id: "01a0603c-c1d0-727d-9e10-7b3b2d6bec58",
  pageTypeSlug: "command",
  type: "command",
  slug: "temper-inventory-buy-rule-lock",
  definition: "the command locking a buy rule named by its id",
  code: "ts",
  changeKind: "change-none",
  taking: [{ said: "<id>", takes: "the id of the buy rule locked" }],
  helpNotes: [
    "a locked rule is refused an update or a deletion until it is unlocked or the call forces it.",
  ],
  invariants: [
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
