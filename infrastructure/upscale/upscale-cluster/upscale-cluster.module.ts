import type { Module } from "@akasha/code-system/module"

export const upscaleCluster = {
  id: "01a0685d-4b35-7018-b4c3-09ff288b2bf1",
  pageTypeSlug: "module",
  slug: "upscale-cluster",
  definition: "upscaling one image on a cluster GPU by running a job and reading the object back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Credentials absent from the environment are named in the refusal rather than left to fail at the store.",
    },
    { invariantKind: "departure", statement: "The input is stored before the job is created." },
    {
      invariantKind: "departure",
      statement: "A job that does not succeed is raised with the tail of its pod's log.",
    },
  ],
} as const satisfies Module
