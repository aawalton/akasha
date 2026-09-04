import type { Alert } from "../alert.page-type.ts"

export const seaweedfsLivenessMetricAbsent = {
  id: "01a06755-62fb-79e5-8109-3cf37e9b47a9",
  pageTypeSlug: "alert",
  slug: "seaweedfs-liveness-metric-absent",
  title: "SeaweedFS liveness metric absent",
  definition: "nothing is reporting whether SeaweedFS is alive",
  domain: "infrastructure",
  summary: "SeaweedFS master metrics are absent — scrape lost or metricsPort dropped",
  description: "txt",
} as const satisfies Alert
