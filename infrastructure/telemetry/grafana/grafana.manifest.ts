import type { Manifest } from "@akasha/k8s-types/manifest"

export const grafana = {
  id: "01a07386-5069-75df-b299-2b356475469a",
  pageTypeSlug: "manifest",
  slug: "grafana",
  definition:
    "the chart server's deployment, its namespace, its configuration and the way in to it",
  code: "ts",
} as const satisfies Manifest
