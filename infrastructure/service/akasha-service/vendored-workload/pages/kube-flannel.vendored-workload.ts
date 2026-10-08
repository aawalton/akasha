import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const kubeFlannel = {
  id: "01a068e5-527c-7e51-81d4-b0a4ffe3365e",
  type: "page-type/vendored-workload",
  slug: "kube-flannel",
  title: "Kube flannel",
  definition: "what gives every pod an address and carries traffic between nodes",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "kube-flannel",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
