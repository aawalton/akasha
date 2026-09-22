import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const auditCache = {
  id: "01a0c9e0-5e63-78a2-81a4-4455fdecc1f6",
  type: "page-type/manifest",
  slug: "audit-cache",
  definition: "the disk an audit keeps its checkout on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit keeps its checkout on a disk of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That disk is on one node, and every audit runs on that node.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The disk holds the history a fetch reads against as well as the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The disk holds what an install left, so the install after it has nothing to do.",
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
} as const satisfies Manifest
