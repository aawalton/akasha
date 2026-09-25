import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const job = {
  id: "01a0675b-16eb-7759-adf7-dac753ca5b98",
  type: "page-type/domain",
  slug: "job",
  definition: "a program that runs until its work is done",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "job" },
    { partOfSpeech: "part-of-speech/noun", spelling: "jobs" },
  ],
  parts: [
    "manifest/deploy-account",
    "manifest/pod-janitor",
    "module/cluster-running",
    "module/deploy-job",
    "module/deploy-job-running",
    "module/run-in-cluster",
    "manifest/audit-cache",
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
