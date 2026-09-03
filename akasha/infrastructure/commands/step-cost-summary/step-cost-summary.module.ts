import type { Module } from "@akasha/code-system/module"

export const stepCostSummary = {
  id: "01a0686c-e937-7000-b0ff-305825034237",
  pageTypeSlug: "module",
  slug: "step-cost-summary",
  definition: "what a named step's runs cost, gathered over the runs and written out as rows",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run whose duration is unknown counts among the runs and not among the timed.",
    },
    {
      invariantKind: "departure",
      statement: "A median over an even count is the mean of the two middle runs.",
    },
    {
      invariantKind: "departure",
      statement: "No run being timed leaves the least, the median and the most unstated.",
    },
    {
      invariantKind: "departure",
      statement: "Seconds are rounded to one place.",
    },
    {
      invariantKind: "absence",
      statement: "A header line whose value is unstated is left out rather than written empty.",
    },
  ],
} as const satisfies Module
