import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runInCluster = {
  id: "01a0ac69-5f36-7c55-b13c-8803a92a27a7",
  type: "page-type/module",
  slug: "run-in-cluster",
  definition: "whether this run is the one the cluster is carrying",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run in the cluster is known by what the pod states in its environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name that fact is stated under is named here and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run whose environment states nothing there is not the run in the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is read by whoever acts differently for being in the cluster.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page, a file or the cluster.",
    },
  ],
} as const satisfies Module
