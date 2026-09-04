import type { Readout } from "../../readout.page-type.ts"

export const fiveHourBack = {
  id: "01a063bd-a526-7d2a-b1f5-8375b86d19ff",
  pageTypeSlug: "readout",
  slug: "five-hour-back",
  definition: "how long until a spent five-hour allowance returns",
  code: "ts",
  label: "5h back",
  unit: "hours",
  place: 2,
  figureFormat: "decimal",
  drawnAs: "number",
  colorSlug: "text",
  groupSlugs: ["claude-usage"],
  wireKey: "five-hour-back",
  querySlug: "claude-accounts-next-five-hour-back",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only an account that has spent its whole five-hour allowance is counted.",
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
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
} as const satisfies Readout
