import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const grafana = {
  id: "01a0739d-9053-797b-9562-07aff48ee592",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "grafana",
  definition:
    "the chart server, its namespace, the sources and dashboards it is given, and its way in",
  code: "ts",
  generatedDirectory: true,
  parts: ["dashboard/database", "dashboard/pods", "dashboard/resources"],
} as const satisfies Manifest
