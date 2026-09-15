import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const cluster = {
  id: "01a073f1-e67a-717a-9d6a-324244b75878",
  type: "domain",
  slug: "cluster",
  definition: "the Kubernetes cluster the system's services run on",
  parts: [
    "domain/cluster-api",
    "domain/cluster-manifests",
    "domain/cluster-operations",
    "domain/cluster-provisioning",
    "domain/k8s-synth",
    "domain/k8s-type",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every folder under `cluster` matches a folder shape.",
    },
    {
      invariantKind: "departure",
      statement: "A service's own manifest sits with that service rather than under `cluster`.",
    },
    {
      invariantKind: "departure",
      statement: "A module one service alone reaches sits under that service's `modules` folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module more than one service reaches sits under the domain with those services.",
    },
    {
      invariantKind: "departure",
      statement: "A workload names the class of node the workload runs on.",
    },
    {
      invariantKind: "gap",
      statement:
        "A workload reaches a node by the needs that workload states rather than by a class node carries.",
    },
    {
      invariantKind: "gap",
      statement: "The machines people use day to day run Linux and are nodes in the cluster.",
    },
    {
      invariantKind: "gap",
      statement:
        "The work a person did on a cluster machine under Windows is work that person can still do.",
    },
    {
      invariantKind: "gap",
      statement: "Work stops on a machine the moment a person starts using that machine.",
    },
  ],
} as const satisfies Domain
