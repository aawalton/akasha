import type { Module } from "@akasha/code/module"

export const upscaleServingJob = {
  id: "01a073af-4669-7130-ac05-5cb2a15a6313",
  pageTypeSlug: "module",
  type: "module",
  slug: "upscale-serving-job",
  definition: "the cluster job one image is upscaled by on a GPU node",
  code: "ts",
  allowsTmpPaths: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The job runs on a node with at least the stated usable video memory.",
    },
    {
      invariantKind: "departure",
      statement: "The job is never retried.",
    },
    {
      invariantKind: "departure",
      statement: "A failure is read rather than hidden by a second attempt.",
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
