import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const loki = {
  id: "01a06816-68b2-782a-9997-af90e9fdae8a",
  type: "page-type/service-cluster",
  slug: "loki",
  definition: "the store holding every log and answering every log query",
  resourceKind: "Deployment",
  namespace: "loki",
  resourceName: "loki",
  image: "grafana/loki:3.1.0",
  replicas: 1,
  containerPort: 3100,
  manifest: ["manifest/loki"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loki keeps a log for seven days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workload's log reaches Loki from a collector on its node.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation program pushes its own log.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Loki takes no authentication of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the tailnet limits who reaches Loki.",
    },
  ],
} as const satisfies ServiceCluster
