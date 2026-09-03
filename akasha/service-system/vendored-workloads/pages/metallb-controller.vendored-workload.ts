import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const metallbController = {
  id: "01a068e5-527c-718d-96eb-f449ce869cd1",
  pageTypeSlug: "vendored-workload",
  slug: "metallb-controller",
  title: "MetalLB controller",
  definition: "what hands a load balancer service its external address",
  resourceKind: "Deployment",
  namespace: "metallb-system",
  resourceName: "controller",
} as const satisfies VendoredWorkload
