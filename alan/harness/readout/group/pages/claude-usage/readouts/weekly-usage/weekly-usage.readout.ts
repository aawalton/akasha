import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const weeklyUsage = {
  id: "01a063bd-a526-7a12-97a4-531aa40ead14",
  type: "page-type/readout",
  slug: "weekly-usage",
  definition: "the percent of their limits the model accounts spend in their seven-day windows",
  label: "Weekly Usage",
  unit: "%",
  drawnAs: "number",
  colorFrom: "readout/weekly-ends",
  groups: [{ group: "readout-group/claude-usage", place: 1 }],
  wireKey: "weekly-usage",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is the mean across every account the pool has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no percent is left out of the mean rather than counted zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account with a percent is no number rather than a mean of zero.",
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
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
  ],
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T17:19:26.092Z",
} as const satisfies Readout
