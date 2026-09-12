import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleDuplicate = {
  id: "01a0603c-c1d3-7aad-9ae3-451fe2454676",
  type: "command",
  slug: "temper-inventory-item-rule-duplicate",
  definition: "the command copying a per-item rule named by its id",
  code: "ts",
  taking: [{ said: "<id>", takes: "the id of the per-item rule copied" }],

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
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "duplicate",
} as const satisfies Command
