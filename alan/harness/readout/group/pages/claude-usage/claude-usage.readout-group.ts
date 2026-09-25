import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const claudeUsage = {
  id: "01a063bd-a526-78fb-9e89-7128b2bdd640",
  type: "page-type/readout-group",
  slug: "claude-usage",
  definition: "how much of the weekly Claude allowance is spent and when more arrives",
  servedBy: ["route/claude-usage"],
  parts: [
    "readout/five-hour-back",
    "readout/weekly-back",
    "readout/weekly-ends",
    "readout/weekly-usage",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading here is drawn as a number rather than as a stoplight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading here is the pool's rather than one account's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How much of the allowance is spent and how long the allowance has left are two readings.",
    },
  ],
} as const satisfies ReadoutGroup
