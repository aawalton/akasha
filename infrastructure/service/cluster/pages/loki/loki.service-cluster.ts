import type { ServiceCluster } from "akasha/infrastructure/service/cluster/service-cluster.page-type.types.ts"

export const loki = {
  id: "01a06816-68b2-782a-9997-af90e9fdae8a",
  type: "service-cluster",
  slug: "loki",
  definition: "the store every log is shipped to and queried out of",
  resourceKind: "Deployment",
  namespace: "loki",
  resourceName: "loki",
  image: "grafana/loki:3.1.0",
  replicas: 1,
  containerPort: 3100,
  manifest: ["manifest/loki"],
  secrets: ["secret/loki-s3-creds-access-key", "secret/loki-s3-creds-secret-key"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Loki keeps a log for seven days.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A workload's log reaches Loki from a collector on its node.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A workstation program pushes its own log.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Loki takes no authentication of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the tailnet limits who reaches Loki.",
    },
  ],
} as const satisfies ServiceCluster
