import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const fiveHourBack = {
  id: "01a063bd-a526-7d2a-b1f5-8375b86d19ff",
  type: "page-type/readout",
  slug: "five-hour-back",
  definition: "how long until a spent five-hour allowance returns",
  label: "5h back",
  unit: "hours",
  place: 2,
  drawnAs: "number",
  color: "color/text",
  groups: ["readout-group/claude-usage"],
  wireKey: "five-hour-back",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an account that has spent its whole five-hour allowance is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the soonest window still ahead of the moment asked in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window already behind that moment is left out rather than read as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account with a window ahead is no reading rather than a wait of zero.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
} as const satisfies Readout
