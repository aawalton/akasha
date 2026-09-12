import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleUnlock = {
  id: "01a0603c-c1d8-788c-b8ed-bed2e9c842df",
  type: "command",
  slug: "temper-inventory-rule-unlock",
  definition: "the command unlocking a category rule named by its id",
  code: "ts",
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
  name: "unlock",
  arguments: [{ argument: "argument/category-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
