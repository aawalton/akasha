import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const claudeUsage = {
  id: "01a063bd-a526-78fb-9e89-7128b2bdd640",
  pageTypeSlug: "readout-group",
  slug: "claude-usage",
  definition: "how much of the weekly Claude allowance is spent and when more arrives",
  partSlugs: [
    "readout/weekly-usage",
    "readout/five-hour-back",
    "readout/weekly-back",
    "readout/weekly-ends",
  ],
  sequenceSlugs: [
    "readout/weekly-usage",
    "readout/five-hour-back",
    "readout/weekly-back",
    "readout/weekly-ends",
  ],
  sortOrder: "place",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each reading here is drawn as a number rather than as a stoplight.",
    },
    {
      invariantKind: "departure",
      statement: "A reading here is the pool's rather than one account's.",
    },
    {
      invariantKind: "departure",
      statement:
        "How much of the allowance is spent and how long the allowance has left are two readings.",
    },
  ],
} as const satisfies ReadoutGroup
