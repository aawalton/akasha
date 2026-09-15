import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryRuleList = {
  id: "01a0603c-c1d7-7e11-bc92-bde45b19ef41",
  type: "page-type/command",
  slug: "temper-inventory-rule-list",
  definition: "the command naming every category rule in the priority order the addon reads them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The controlled rules come before the rules a person wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The position column is the index a reorder names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order given is the order the addon reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule is named by the title that rule carries beside its id.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
