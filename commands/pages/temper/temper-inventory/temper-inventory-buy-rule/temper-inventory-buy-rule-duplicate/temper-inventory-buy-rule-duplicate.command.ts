import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleDuplicate = {
  id: "01a0603c-c1cf-724f-8dcf-c1faa571392d",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-duplicate",
  definition: "the command copying a buy rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the buy rule copied" }],
  helpNotes: [
    "the copy is unlocked and inactive whatever the original was.",
    "an id no buy rule carries is refused by that id.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The copy is unlocked.",
    },
    {
      invariantKind: "departure",
      statement: "The copy is inactive.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule carries refuses the call.",
    },
  ],
} as const satisfies Command
