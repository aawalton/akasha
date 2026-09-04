import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const coredns = {
  id: "01a068e5-527c-7655-8461-4f81d6b6c236",
  pageTypeSlug: "vendored-workload",
  slug: "coredns",
  title: "CoreDNS",
  definition: "what answers DNS for names inside the cluster",
  resourceKind: "Deployment",
  namespace: "kube-system",
  resourceName: "coredns",
} as const satisfies VendoredWorkload
