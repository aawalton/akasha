import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployJobRunning = {
  id: "01a0a102-c51d-75a9-8995-8d088708ee8d",
  type: "page-type/module",
  slug: "deploy-job-running",
  definition: "a deploy's job put on the cluster, waited on, and answered as what that job said",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A job is put up from the manifest composed for that subject and commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy's job goes up the way every job this system runs goes up.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits on a job or reads that job's lines.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here composes the job.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes what the deploy learned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit the subject was last deployed at is read before the job is composed.",
    },
  ],
} as const satisfies Module
