import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transportDeployment = {
  id: "01a06816-2f11-7368-876c-6dd1f691b8bf",
  type: "page-type/module",
  slug: "transport-deployment",
  definition: "the workload the cluster runs the transport as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bare repositories are made ready before the source cache is filled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store is mounted read-only into everything but the server.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod's containers share one process namespace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One copy runs at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The old copy goes before the new copy starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server runs the code out of the source cache the sidecar keeps current.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Serving a whole repository to a cold reader costs the server several gigabytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server holds enough memory to serve a cold reader the whole repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where that code sits in the cache is asked of the index rather than spelled.",
    },
  ],
} as const satisfies Module
