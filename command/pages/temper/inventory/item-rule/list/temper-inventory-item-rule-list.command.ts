import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryItemRuleList = {
  id: "01a0603c-c1d3-7fdf-bf4e-51b3a559a428",
  type: "page-type/command",
  slug: "temper-inventory-item-rule-list",
  definition: "the command naming every per-item rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rules are given in the order the settings have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The act that lists takes the read it lists from rather than reaching it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The JSON says the whole rule and a row says the columns a rule carries.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
