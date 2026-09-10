import type { Readout } from "../../readout.page-type.types.ts"

export const weeklyEnds = {
  id: "01a063bd-a526-7623-8e91-2865d3976acc",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "weekly-ends",
  definition: "how long until the weekly allowance window closes",
  code: "ts",
  label: "7d ends",
  unit: "hours",
  place: 4,
  drawnAs: "number",
  scale: "allowance-hours",
  groups: ["claude-usage"],
  wireKey: "weekly-ends",
  querySlug: "claude-accounts-next-seven-day-end",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only an account with weekly allowance left to spend is counted.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is the soonest window still ahead of the moment asked in.",
    },
    {
      invariantKind: "departure",
      statement: "A window already behind that moment is left out rather than read as zero.",
    },
    {
      invariantKind: "departure",
      statement: "No account with a window ahead is no reading rather than a wait of zero.",
    },
    {
      invariantKind: "departure",
      statement: "The color this reading takes is the color the weekly usage reading is shown in.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
} as const satisfies Readout
