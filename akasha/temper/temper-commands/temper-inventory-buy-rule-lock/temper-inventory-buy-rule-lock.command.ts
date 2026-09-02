import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleLock = {
  id: "01a0603c-c1d0-727d-9e10-7b3b2d6bec58",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-lock",
  definition: "the command locking a buy rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the buy rule locked" }],
  helpNotes: [
    "locking a buy rule already locked changes nothing.",
    "a locked rule is refused an update or a deletion until it is unlocked or the call forces it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Locking a buy rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule carries refuses the call.",
    },
  ],
} as const satisfies Command
