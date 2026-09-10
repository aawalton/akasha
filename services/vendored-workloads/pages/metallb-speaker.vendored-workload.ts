import type { VendoredWorkload } from "../vendored-workload.page-type.types.ts"

export const metallbSpeaker = {
  id: "01a068e5-527c-704c-8fe5-f706dfe94839",
  pageTypeSlug: "vendored-workload",
  type: "vendored-workload",
  slug: "metallb-speaker",
  title: "MetalLB speaker",
  definition: "what announces a load balancer address to the network from each node",
  resourceKind: "DaemonSet",
  namespace: "metallb-system",
  resourceName: "speaker",
} as const satisfies VendoredWorkload
