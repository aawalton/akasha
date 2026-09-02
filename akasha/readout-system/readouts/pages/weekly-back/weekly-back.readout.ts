import type { Readout } from "../../readout.page-type.ts"

export const weeklyBack = {
  id: "01a063bd-a526-795d-b845-b6fb54c9ef34",
  pageTypeSlug: "readout",
  slug: "weekly-back",
  definition: "how long until a spent weekly allowance returns",
  code: "ts",
  label: "7d back",
  unit: "hours",
  place: 3,
  figureFormat: "decimal",
  drawnAs: "number",
  colorSlug: "text",
  groupSlugs: ["claude-usage"],
  wireKey: "weekly-back",
  querySlug: "claude-accounts-next-seven-day-back",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only an account that has spent its whole weekly allowance is counted.",
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
