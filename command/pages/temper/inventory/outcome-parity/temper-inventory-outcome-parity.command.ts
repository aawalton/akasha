import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryOutcomeParity = {
  id: "01a09b55-1b5c-74af-9384-4db91fda4e9b",
  type: "page-type/command",
  slug: "temper-inventory-outcome-parity",
  definition:
    "whether the outcome-only run reaches what the full run reaches, over every item held",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every item in every bag of every location is ruled on rather than a sample.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An indeterminate outcome is compared whole rather than counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One item disagreeing answers with that item rather than with a tally.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Neither run compared here is the addon's, so agreement is no sign the addon agrees.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both runs read one env, so a signal that env lacks leaves the two runs alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that found a divergence answers a code other than zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This answers in one shape, so no second shape can answer a second code.",
    },
  ],
  name: "outcome-parity",
  arguments: [{ argument: "argument/inventory-path" }, { argument: "argument/characters-path" }],
} as const satisfies Command
