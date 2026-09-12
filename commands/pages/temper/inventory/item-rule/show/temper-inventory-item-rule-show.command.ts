import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleShow = {
  id: "01a0603c-c1d4-7e72-bcc5-fb55fe3c992c",
  type: "command",
  slug: "temper-inventory-item-rule-show",
  definition: "the command giving back one per-item rule named by its id",
  code: "ts",
  taking: [
    { said: "<id>", takes: "the id of the per-item rule given back" },
    { said: "--tsv", takes: "give one tab-separated row rather than JSON" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "show",
} as const satisfies Command
