import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleList = {
  id: "01a0603c-c1d7-7e11-bc92-bde45b19ef41",
  type: "command",
  slug: "temper-inventory-rule-list",
  definition: "the command naming every category rule in the priority order the addon reads them",
  code: "ts",
  changeKind: "change-none",
  taking: [{ said: "--json", takes: "give the rules as JSON rather than as tab-separated rows" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The controlled rules come before the rules a person wrote.",
    },
    {
      invariantKind: "departure",
      statement: "The position column is the index a reorder names.",
    },
    {
      invariantKind: "departure",
      statement: "The order given is the order the addon reads.",
    },
  ],
  name: "list",
} as const satisfies Command
