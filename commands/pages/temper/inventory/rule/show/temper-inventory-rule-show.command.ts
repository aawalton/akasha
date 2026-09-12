import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleShow = {
  id: "01a0603c-c1d8-7a9c-b7d3-8fab0e6c8abf",
  type: "command",
  slug: "temper-inventory-rule-show",
  definition: "the command giving back one category rule named by its id",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the category rule given back" },
    { said: "--json", takes: "give the rule as JSON" },
    { said: "--tsv", takes: "give one tab-separated row rather than JSON" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules a person wrote are looked in before the controlled ones.",
    },
    {
      invariantKind: "departure",
      statement: "A controlled rule's id is `controlled:` and what that rule was worked out from.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
  name: "show",
} as const satisfies Command
