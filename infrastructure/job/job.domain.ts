import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const job = {
  id: "01a0675b-16eb-7759-adf7-dac753ca5b98",
  type: "page-type/domain",
  slug: "job",
  definition: "a workload that runs to completion and stops",
  parts: [
    "manifest/deploy-account",
    "manifest/pod-janitor",
    "module/cluster-running",
    "module/deploy-job",
    "module/deploy-job-running",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that fails leaves its object behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later run succeeding does not remove the object a failed job left.",
    },
  ],
} as const satisfies Domain
