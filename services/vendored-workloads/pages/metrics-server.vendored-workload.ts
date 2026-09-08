import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const metricsServer = {
  id: "01a068e5-527c-769a-932a-0da336ed9815",
  pageTypeSlug: "vendored-workload",
  slug: "metrics-server",
  title: "Metrics server",
  definition: "what collects pod and node resource use for the cluster to read",
  resourceKind: "Deployment",
  namespace: "kube-system",
  resourceName: "metrics-server",
} as const satisfies VendoredWorkload
