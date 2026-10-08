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
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
