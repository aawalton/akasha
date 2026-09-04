import type { Readout } from "../../readout.page-type.ts"

export const weeklyUsage = {
  id: "01a063bd-a526-7a12-97a4-531aa40ead14",
  pageTypeSlug: "readout",
  slug: "weekly-usage",
  definition: "how much of the weekly Claude allowance the pool has spent",
  code: "ts",
  label: "Weekly Usage",
  unit: "percent",
  place: 1,
  figureFormat: "integer",
  drawnAs: "number",
  colorFromSlug: "weekly-ends",
  groupSlugs: ["claude-usage"],
  wireKey: "weekly-usage",
  querySlug: "claude-accounts-mean-weekly-used",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the mean across every account the pool holds.",
    },
    {
      invariantKind: "departure",
      statement: "An account carrying no percent is left out of the mean rather than counted zero.",
    },
    {
      invariantKind: "departure",
      statement: "No account carrying a percent is no reading rather than a mean of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A percent stated as text is read as the number that percent spells.",
    },
    {
      invariantKind: "departure",
      statement:
        "The figure is how much of the allowance is spent and the color is how long the allowance has left.",
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
