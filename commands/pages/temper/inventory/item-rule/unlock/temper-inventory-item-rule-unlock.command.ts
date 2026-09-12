import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleUnlock = {
  id: "01a0603c-c1d4-7ce4-89db-b0f353aba838",
  type: "command",
  slug: "temper-inventory-item-rule-unlock",
  definition: "the command unlocking a per-item rule named by its id",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unlocking a per-item rule already unlocked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "unlock",
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
