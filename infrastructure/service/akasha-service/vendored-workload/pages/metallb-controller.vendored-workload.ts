import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const metallbController = {
  id: "01a068e5-527c-718d-96eb-f449ce869cd1",
  type: "page-type/vendored-workload",
  slug: "metallb-controller",
  title: "MetalLB controller",
  definition: "what hands a load balancer service its external address",
  resourceKind: "Deployment",
  namespace: "metallb-system",
  resourceName: "controller",
} as const satisfies VendoredWorkload
