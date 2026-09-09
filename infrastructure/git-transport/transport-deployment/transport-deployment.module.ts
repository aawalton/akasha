import type { Module } from "@akasha/code/module"

export const transportDeployment = {
  id: "01a06816-2f11-7368-876c-6dd1f691b8bf",
  pageTypeSlug: "module",
  type: "module",
  slug: "transport-deployment",
  definition: "the workload the cluster runs the transport as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bare repositories are made ready before the source cache is filled.",
    },
    {
      invariantKind: "departure",
      statement: "The store is mounted read-only into everything but the server.",
    },
    {
      invariantKind: "departure",
      statement: "The pod's containers share one process namespace.",
    },
    {
      invariantKind: "departure",
      statement: "One copy runs at a time.",
    },
    {
      invariantKind: "departure",
      statement: "The old copy goes before the new copy starts.",
    },
    {
      invariantKind: "departure",
      statement: "The server runs the code out of the source cache the sidecar keeps current.",
    },
  ],
} as const satisfies Module
