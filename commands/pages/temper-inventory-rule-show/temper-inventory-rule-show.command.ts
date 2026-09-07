import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleShow = {
  id: "01a0603c-c1d8-7a9c-b7d3-8fab0e6c8abf",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-show",
  definition: "the command giving back one category rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the category rule given back" },
    { said: "--json", takes: "give the rule as JSON" },
    { said: "--tsv", takes: "give one tab-separated row rather than JSON" },
  ],
  helpNotes: [
    "the rules a person wrote are looked in first, then the controlled rules worked out from settings.",
    "a controlled rule is named as `controlled:` and what it was worked out from.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules a person wrote are looked in before the controlled ones.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
} as const satisfies Command
