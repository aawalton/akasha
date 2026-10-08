import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const metallbSpeaker = {
  id: "01a068e5-527c-704c-8fe5-f706dfe94839",
  type: "page-type/vendored-workload",
  slug: "metallb-speaker",
  title: "MetalLB speaker",
  definition: "what announces a load balancer address to the network from each node",
  resourceKind: "DaemonSet",
  namespace: "metallb-system",
  resourceName: "speaker",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
