import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const weeklyEnds = {
  id: "01a063bd-a526-7623-8e91-2865d3976acc",
  type: "page-type/readout",
  slug: "weekly-ends",
  definition: "how long until the weekly allowance window closes",
  label: "7d ends",
  unit: "h",
  minuteUnit: "m",
  noneLeftWords: "none",
  place: 4,
  drawnAs: "number",
  scale: "readout-scale/allowance-hours",
  groups: ["readout-group/claude-usage"],
  wireKey: "weekly-ends",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an account with weekly allowance left to spend is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the soonest window still ahead of the moment asked in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window already behind that moment is left out rather than taken as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account with a window ahead is no reading rather than a wait of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color this reading takes is the color the weekly usage reading is shown in.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
} as const satisfies Readout
