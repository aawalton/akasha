import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleDuplicate = {
  id: "01a0603c-c1d7-79c4-89bc-1293587ca4fc",
  type: "command",
  slug: "temper-inventory-rule-duplicate",
  definition: "the command copying a category rule named by its id",
  code: "ts",
  changeKind: "change-none",
  taking: [{ said: "<id>", takes: "the id of the category rule copied" }],

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
      statement: "An id no category rule carries refuses the call.",
    },
  ],
  name: "duplicate",
} as const satisfies Command
