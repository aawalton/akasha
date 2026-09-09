import type { Domain } from "../../domains/domain.page-type.ts"

export const job = {
  id: "01a0675b-16eb-7759-adf7-dac753ca5b98",
  pageTypeSlug: "domain",
  slug: "job",
  definition: "a workload that runs to completion and stops",
  parts: ["manifest/pod-janitor"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A job that fails leaves its object behind.",
    },
    {
      invariantKind: "departure",
      statement: "A later run succeeding does not remove the object a failed job left.",
    },
  ],
} as const satisfies Domain
