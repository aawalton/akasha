import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const kubeProxy = {
  id: "01a068e5-527c-7672-8027-1e5b535dab2d",
  type: "page-type/vendored-workload",
  slug: "kube-proxy",
  title: "Kube proxy",
  definition: "what routes a service address to the pods behind it on each node",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "kube-proxy",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
