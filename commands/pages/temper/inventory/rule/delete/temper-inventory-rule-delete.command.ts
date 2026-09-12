import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleDelete = {
  id: "01a0603c-c1d7-71ff-becd-5055afe65a24",
  type: "command",
  slug: "temper-inventory-rule-delete",
  definition: "the command taking away a category rule named by its id",
  code: "ts",

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
  name: "delete",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
