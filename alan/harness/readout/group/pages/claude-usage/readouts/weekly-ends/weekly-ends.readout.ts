import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const weeklyEnds = {
  id: "01a063bd-a526-7623-8e91-2865d3976acc",
  type: "page-type/readout",
  slug: "weekly-ends",
  definition: "the time until the next seven-day window ends for a model account under its limit",
  label: "7d ends",
  unit: "h",
  minuteUnit: "m",
  noneLeftWords: "none",
  drawnAs: "number",
  scale: "readout-scale/allowance-hours",
  groups: [{ group: "readout-group/claude-usage", place: 4 }],
  wireKey: "weekly-ends",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an account with weekly allowance left to spend is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is the soonest window still ahead of the moment asked in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window already behind that moment is left out rather than taken as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account with a window ahead is no number rather than a wait of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color this number takes is the color the weekly usage number is shown in.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
  ],
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T17:18:28.954Z",
} as const satisfies Readout
