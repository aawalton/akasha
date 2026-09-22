import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const upscaleServingJob = {
  id: "01a073af-4669-7130-ac05-5cb2a15a6313",
  type: "page-type/module",
  slug: "upscale-serving-job",
  definition: "the cluster job an image is upscaled by on a GPU node",
  code: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The job runs on a node with at least the stated usable video memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The job is never retried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure is read rather than hidden by a second attempt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The weights are cached on the node rather than fetched for each job.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The image comes in and goes out through the object store rather than through the job's arguments.",
    },
  ],
} as const satisfies Module
