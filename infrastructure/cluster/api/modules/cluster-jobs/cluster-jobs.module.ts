import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterJobs = {
  id: "01a068d4-d2aa-72e1-bfcb-3e3912d25e2d",
  type: "page-type/module",
  slug: "cluster-jobs",
  definition: "work the cluster runs once to completion, and what it wrote while running",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A job is watched by polling rather than by a stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job neither done nor failed within the ceiling is answered as a timeout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job's log is read from the first pod that job made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that made no pod has an empty log.",
    },
  ],
  createdAt: "2026-09-03T19:52:53.162Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
