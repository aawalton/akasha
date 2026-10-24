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
      decisionKind: "decision-kind/departure",
      statement: "A deploy's job goes up only once no other job deploying its subject is running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller listening is told the job is starting before any wait the job makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What puts the job up is handed in, so a test reaches no cluster and no secret.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits on a job or reads that job's lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy's work finished where its job says it kept the commit for that subject.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job the cluster ended after that line answers as a deploy that put up.",
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
  updatedAt: "2026-10-24T23:25:30.130Z",
  createdAt: "2026-09-14T17:41:48.445Z",
} as const satisfies Module
