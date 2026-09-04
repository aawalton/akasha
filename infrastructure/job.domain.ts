import type { Domain } from "../domains/domain.page-type.ts"

export const job = {
  id: "01a0675b-16eb-7759-adf7-dac753ca5b98",
  pageTypeSlug: "domain",
  slug: "job",
  definition: "a workload that runs to completion and stops",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A job that fails leaves its object behind, and a later run succeeding does not remove it.",
    },
  ],
} as const satisfies Domain
