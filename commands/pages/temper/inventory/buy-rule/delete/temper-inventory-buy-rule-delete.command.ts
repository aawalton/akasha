import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleDelete = {
  id: "01a0603c-c1cf-7d7d-8d74-72103cd55734",
  type: "command",
  slug: "temper-inventory-buy-rule-delete",
  definition: "the command taking away a buy rule named by its id",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the buy rule taken away" },
    { said: "--force", takes: "take it away even where it is locked" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked buy rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule has refuses the call.",
    },
  ],
} as const satisfies Command
