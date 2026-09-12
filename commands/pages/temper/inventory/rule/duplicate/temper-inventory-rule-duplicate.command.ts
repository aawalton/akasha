import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleDuplicate = {
  id: "01a0603c-c1d7-79c4-89bc-1293587ca4fc",
  type: "command",
  slug: "temper-inventory-rule-duplicate",
  definition: "the command copying a category rule named by its id",
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
      statement: "An id no category rule carries refuses the call.",
    },
  ],
  name: "duplicate",
  arguments: [{ argument: "argument/category-rule-id", required: true, saidAs: "word" }],
} as const satisfies Command
