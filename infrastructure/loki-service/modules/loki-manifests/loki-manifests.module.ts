import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lokiManifests = {
  id: "01a06816-68b1-7345-a4a7-66ab2bbf829e",
  type: "page-type/module",
  slug: "loki-manifests",
  definition: "the namespace, config, disk, deployment and service manifests Loki runs as",
  code: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the loki-config configmap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loki keeps its chunks and its index on a disk of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That disk is on one node, and Loki runs on the node holding that disk.",
    },
  ],
} as const satisfies Module
