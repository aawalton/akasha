import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const upscaleCluster = {
  id: "01a0685d-4b35-7018-b4c3-09ff288b2bf1",
  type: "page-type/module",
  slug: "upscale-cluster",
  definition:
    "upscaling an image on a cluster GPU by running a job and reading back what it landed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The job is handed the slug of an image page that is already there.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No bytes are moved before the job is created.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The job names in its log the image page the job landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job naming no such page is raised, even where that job succeeded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that does not succeed is raised with the tail of its pod's log.",
    },
  ],
} as const satisfies Module
