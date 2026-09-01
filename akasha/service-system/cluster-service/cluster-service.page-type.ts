import type { PageType } from "@akasha/pages-system/page-type"
import type { Service } from "../service/service.page-type.ts"
import type { Namespace } from "./properties/namespace.text-property.ts"
import type { ResourceKind } from "./properties/resource-kind.text-property.ts"
import type { ResourceName } from "./properties/resource-name.text-property.ts"

export type ClusterService = Service & {
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
}

export const clusterService = {
  id: "01a05a41-58c2-7cbb-bfed-c234697164e3",
  pageTypeSlug: "page-type",
  slug: "cluster-service",
  definition: "a service the cluster runs as a workload",
  pluralSlug: "cluster-services",
  extendsSlug: "page-type/service",
  partSlugs: [
    "text-property/namespace",
    "text-property/resource-kind",
    "text-property/resource-name",
  ],
  properties: [
    { pagePropertySlug: "resource-kind", required: true, many: false },
    { pagePropertySlug: "namespace", required: true, many: false },
    { pagePropertySlug: "resource-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cluster service is one resource carrying a pod template.",
    },
    {
      invariantKind: "absence",
      statement: "The resource the cluster calls a Service is not one of these.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service runs one copy unless it is spread across nodes on purpose.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service stands under the domain it serves.",
    },
  ],
} as const satisfies PageType
