import type { Domain } from "../../domains/domain.page-type.ts"

export const runCost = {
  id: "01a06860-a0ef-7619-8f93-c450df9427ad",
  pageTypeSlug: "domain",
  slug: "run-cost",
  definition: "how long a run takes, said as one of seven named bands",
  pluralSlug: "run-costs",
  partSlugs: [
    "domain/run-cost-instant",
    "domain/run-cost-fast",
    "domain/run-cost-lagging",
    "domain/run-cost-slow",
    "domain/run-cost-painful",
    "domain/run-cost-torture",
    "domain/run-cost-eternal",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A band is a ceiling on the clock rather than on processor time or on memory.",
    },
    {
      invariantKind: "departure",
      statement: "A run is of the tightest band whose ceiling the run finishes within.",
    },
    {
      invariantKind: "departure",
      statement: "The bands widen in order from instant through to eternal.",
    },
    {
      invariantKind: "departure",
      statement: "Eternal is the last band and holds every run no earlier band holds.",
    },
    {
      invariantKind: "departure",
      statement: "A band names a cost so a budget can be said without a number.",
    },
  ],
} as const satisfies Domain
