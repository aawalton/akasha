import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleLock = {
  id: "01a0603c-c1d3-7b21-8e7e-1cbbd4192e8b",
  type: "command",
  slug: "temper-inventory-item-rule-lock",
  definition: "the command locking a per-item rule named by its id",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A locked per-item rule is refused an update or a deletion unless that call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "Locking a per-item rule already locked changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "lock",
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
