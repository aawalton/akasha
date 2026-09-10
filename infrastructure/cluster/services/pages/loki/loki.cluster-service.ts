import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const loki = {
  id: "01a06816-68b2-782a-9997-af90e9fdae8a",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "loki",
  definition: "the store every log is shipped to and queried out of",
  resourceKind: "Deployment",
  namespace: "loki",
  resourceName: "loki",
  image: "grafana/loki:3.1.0",
  replicas: 1,
  containerPort: 3100,
  manifest: "loki",
  secrets: ["secret/loki-s3-creds-access-key", "secret/loki-s3-creds-secret-key"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loki keeps a log for seven days.",
    },
    {
      invariantKind: "departure",
      statement: "A workload's log reaches Loki from a collector on its node.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation program pushes its own log.",
    },
    {
      invariantKind: "absence",
      statement: "Loki takes no authentication of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Only the tailnet limits who reaches Loki.",
    },
  ],
} as const satisfies ClusterService
