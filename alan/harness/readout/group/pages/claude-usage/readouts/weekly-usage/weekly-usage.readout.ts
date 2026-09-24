import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const weeklyUsage = {
  id: "01a063bd-a526-7a12-97a4-531aa40ead14",
  type: "page-type/readout",
  slug: "weekly-usage",
  definition: "how much of the weekly Claude allowance the pool has spent",
  label: "Weekly Usage",
  unit: "%",
  place: 1,
  drawnAs: "number",
  colorFrom: "readout/weekly-ends",
  groups: ["readout-group/claude-usage"],
  wireKey: "weekly-usage",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the mean across every account the pool has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no percent is left out of the mean rather than counted zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account with a percent is no reading rather than a mean of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percent stated as text is taken as the number that percent spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The figure is how much of the allowance is spent and the color is how long the allowance has left.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
} as const satisfies Readout
