import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const weeklyBack = {
  id: "01a063bd-a526-795d-b845-b6fb54c9ef34",
  type: "page-type/readout",
  slug: "weekly-back",
  definition: "the time until the next seven-day window ends for a model account at its limit",
  label: "7d back",
  unit: "h",
  minuteUnit: "m",
  noneLeftWords: "none",
  drawnAs: "number",
  color: "color/text",
  groups: [{ group: "readout-group/claude-usage", place: 3 }],
  wireKey: "weekly-back",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an account that has spent its whole weekly allowance is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is the soonest window still ahead of the moment asked in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window already behind that moment is left out rather than read as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account with a window ahead is no number rather than a wait of zero.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
  ],
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T17:17:40.935Z",
} as const satisfies Readout
