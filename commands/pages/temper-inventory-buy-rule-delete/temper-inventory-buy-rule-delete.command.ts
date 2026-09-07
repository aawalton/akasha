import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleDelete = {
  id: "01a0603c-c1cf-7d7d-8d74-72103cd55734",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-delete",
  definition: "the command taking away a buy rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the buy rule taken away" },
    { said: "--force", takes: "take it away even where it is locked" },
  ],
  helpNotes: [
    "a locked buy rule is refused rather than taken away, unless `--force` is said.",
    "an id no buy rule carries is refused by that id.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked buy rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule carries refuses the call.",
    },
  ],
} as const satisfies Command
