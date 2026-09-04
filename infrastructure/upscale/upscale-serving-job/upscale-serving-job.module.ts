import type { Module } from "@akasha/code-system/module"

export const upscaleServingJob = {
  id: "01a0685d-4b35-7016-92d2-c662f191fc6c",
  pageTypeSlug: "module",
  slug: "upscale-serving-job",
  definition: "the cluster job one image is upscaled by on a GPU node",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The job runs on a node holding at least the stated usable video memory.",
    },
    {
      invariantKind: "departure",
      statement:
        "The job is never retried, so a failure is read rather than hidden by a second attempt.",
    },
    {
      invariantKind: "departure",
      statement: "The weights are cached on the node rather than fetched for each job.",
    },
    {
      invariantKind: "departure",
      statement:
        "The image comes in and goes out through the object store rather than through the job's arguments.",
    },
  ],
} as const satisfies Module
