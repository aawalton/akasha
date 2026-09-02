import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleUnlock = {
  id: "01a0603c-c1d8-788c-b8ed-bed2e9c842df",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-unlock",
  definition: "the command unlocking a category rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<id>", takes: "the id of the category rule unlocked" }],
  helpNotes: ["unlocking a category rule already unlocked changes nothing."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unlocking a category rule already unlocked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
} as const satisfies Command
