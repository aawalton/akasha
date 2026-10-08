import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const metricsServer = {
  id: "01a068e5-527c-769a-932a-0da336ed9815",
  type: "page-type/vendored-workload",
  slug: "metrics-server",
  title: "Metrics server",
  definition: "what collects pod and node resource use for the cluster to read",
  resourceKind: "Deployment",
  namespace: "kube-system",
  resourceName: "metrics-server",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
