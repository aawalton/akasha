import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleDelete = {
  id: "01a0603c-c1d2-7862-9289-2b1f29d3c20e",
  type: "command",
  slug: "temper-inventory-item-rule-delete",
  definition: "the command taking away a per-item rule named by its id",
  code: "ts",
  taking: [{ said: "<id>", takes: "the id of the per-item rule taken away" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked per-item rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "delete",
  arguments: [{ argument: "argument/force" }],
} as const satisfies Command
