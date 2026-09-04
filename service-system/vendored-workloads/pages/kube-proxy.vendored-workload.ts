import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const kubeProxy = {
  id: "01a068e5-527c-7672-8027-1e5b535dab2d",
  pageTypeSlug: "vendored-workload",
  slug: "kube-proxy",
  title: "Kube proxy",
  definition: "what routes a service address to the pods behind it on each node",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "kube-proxy",
} as const satisfies VendoredWorkload
