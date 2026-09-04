import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Namespace } from "../cluster-services/properties/namespace.text-property.ts"
import type { ResourceKind } from "../cluster-services/properties/resource-kind.text-property.ts"
import type { ResourceName } from "../cluster-services/properties/resource-name.text-property.ts"
import type { Service } from "../services/service.page-type.ts"

export type VendoredWorkload = Service & {
  title: Title
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
}

export const vendoredWorkload = {
  id: "01a068e5-527b-7fd9-b67c-c38bcf39040a",
  pageTypeSlug: "page-type",
  slug: "vendored-workload",
  definition: "a workload the cluster runs that this repository writes no manifest for",
  pluralSlug: "vendored-workloads",
  extendsSlug: ["page-type/service"],
  partSlugs: [
    "vendored-workload/barman-cloud",
    "vendored-workload/cert-manager-cainjector",
    "vendored-workload/cert-manager-webhook",
    "vendored-workload/cert-manager",
    "vendored-workload/cnpg-controller-manager",
    "vendored-workload/coredns",
    "vendored-workload/kube-flannel",
    "vendored-workload/kube-proxy",
    "vendored-workload/metallb-controller",
    "vendored-workload/metallb-speaker",
    "vendored-workload/metrics-server",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "resource-kind", required: true, many: false },
    { pagePropertySlug: "namespace", required: true, many: false },
    { pagePropertySlug: "resource-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A vendored workload is one resource carrying a pod template.",
    },
    {
      invariantKind: "departure",
      statement: "A vendored workload's manifests come from outside this repository.",
    },
    {
      invariantKind: "absence",
      statement: "A vendored workload names no image and no manifest code.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workload this repository emits manifests for is a cluster service rather than one of these.",
    },
  ],
} as const satisfies PageType
