import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleDuplicate = {
  id: "01a0603c-c1d3-7aad-9ae3-451fe2454676",
  type: "command",
  slug: "temper-inventory-item-rule-duplicate",
  definition: "the command copying a per-item rule named by its id",
  code: "ts",

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
  arguments: [{ argument: "argument/item-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
