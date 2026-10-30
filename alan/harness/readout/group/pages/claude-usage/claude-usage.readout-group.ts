import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const claudeUsage = {
  id: "01a063bd-a526-78fb-9e89-7128b2bdd640",
  type: "page-type/readout-group",
  slug: "claude-usage",
  definition: "the readouts on the usage windows of the model accounts",
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
      statement: "Each readout here is shown as a number rather than as a stoplight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number here is the pool's rather than one account's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How much of the allowance is spent and how long the allowance has left are two numbers.",
    },
  ],
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T17:09:06.451Z",
} as const satisfies ReadoutGroup
