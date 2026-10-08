import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const coredns = {
  id: "01a068e5-527c-7655-8461-4f81d6b6c236",
  type: "page-type/vendored-workload",
  slug: "coredns",
  title: "CoreDNS",
  definition: "what answers DNS for names inside the cluster",
  resourceKind: "Deployment",
  namespace: "kube-system",
  resourceName: "coredns",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
