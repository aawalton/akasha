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
} as const satisfies VendoredWorkload
