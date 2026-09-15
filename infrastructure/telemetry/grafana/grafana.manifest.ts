import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const grafana = {
  id: "01a0739d-9053-797b-9562-07aff48ee592",
  type: "page-type/manifest",
  slug: "grafana",
  definition:
    "the chart server, its namespace, the sources and dashboards it is given, and its way in",
  code: "ts",
  generatedDirectory: true,
  parts: ["dashboard/database", "dashboard/pods", "dashboard/resources"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the grafana-secrets secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys hashed from it are GRAFANA_ADMIN_PASSWORD and GRAFANA_DB_RO_PASSWORD.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pod template carries the hash of the grafana-datasources and grafana-dashboards configmaps.",
    },
  ],
} as const satisfies Manifest
