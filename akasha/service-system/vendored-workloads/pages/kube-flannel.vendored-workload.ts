import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const kubeFlannel = {
  id: "01a068e5-527c-7e51-81d4-b0a4ffe3365e",
  pageTypeSlug: "vendored-workload",
  slug: "kube-flannel",
  title: "Kube flannel",
  definition: "what gives every pod an address and carries traffic between nodes",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "kube-flannel",
} as const satisfies VendoredWorkload
