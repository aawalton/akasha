import type { Domain } from "../../domains/domain.page-type.ts"

export const cluster = {
  id: "01a073f1-e67a-717a-9d6a-324244b75878",
  pageTypeSlug: "domain",
  slug: "cluster",
  definition: "the Kubernetes cluster the system's services run on",
  parts: [
    "domain/cluster-operations",
    "workspace-package/cluster-manifests",
    "page-type/cluster-service",
    "domain/cluster-provisioning",
    "domain/cluster-api",
    "domain/k8s-synth",
    "domain/k8s-types",
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
  ],
} as const satisfies Domain
