import type { Module } from "@akasha/code-system/module"

export const clusterJobs = {
  id: "01a068d4-d2aa-72e1-bfcb-3e3912d25e2d",
  pageTypeSlug: "module",
  slug: "cluster-jobs",
  definition: "work the cluster runs once to completion, and what it wrote while running",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A job is watched by polling rather than by a stream.",
    },
    {
      invariantKind: "departure",
      statement: "A job neither done nor failed within the ceiling is answered as a timeout.",
    },
    {
      invariantKind: "departure",
      statement: "A job's log is read from the first pod it made, and is empty where it made none.",
    },
    {
      invariantKind: "departure",
      statement: "An out-of-cpu event is attributed to a node by the host the event names.",
    },
  ],
} as const satisfies Module
