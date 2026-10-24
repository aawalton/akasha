import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const deployCache = {
  id: "01a16fe8-414f-7d77-af88-d3d97de73057",
  type: "page-type/manifest",
  slug: "deploy-cache",
  definition: "the disk a deploy keeps the repository's history on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy keeps the repository's history on a disk of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That disk is on one node, and every deploy runs on that node.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The disk is apart from the audit's, so no deploy waits on an audit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The disk outlives the claim on it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a job does with that disk.",
    },
  ],
  createdAt: "2026-10-24T21:54:14.478Z",
  updatedAt: "2026-10-24T21:54:14.478Z",
} as const satisfies Manifest
