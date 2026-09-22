import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const upscaleCluster = {
  id: "01a0685d-4b35-7018-b4c3-09ff288b2bf1",
  type: "page-type/module",
  slug: "upscale-cluster",
  definition: "upscaling an image on a cluster GPU by running a job and reading the object back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Credentials the environment lacks are named in the refusal rather than left to fail at the store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The input is stored before the job is created.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that does not succeed is raised with the tail of its pod's log.",
    },
  ],
} as const satisfies Module
