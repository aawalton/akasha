import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleDelete = {
  id: "01a0603c-c1d7-71ff-becd-5055afe65a24",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-delete",
  definition: "the command taking away a category rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the category rule taken away" },
    { said: "--force", takes: "take it away even where it is locked" },
  ],
  helpNotes: [
    "a locked category rule is refused rather than taken away, unless `--force` is said.",
    "an id no category rule carries is refused by that id.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked category rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
} as const satisfies Command
