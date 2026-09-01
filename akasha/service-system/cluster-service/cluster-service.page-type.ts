import type { PageType } from "@akasha/pages-system/page-type"
import type { Service } from "../service/service.page-type.ts"
import type { ContainerPort } from "./properties/container-port.number-property.ts"
import type { Image } from "./properties/image.text-property.ts"
import type { ManifestCode } from "./properties/manifest-code.text-property.ts"
import type { Namespace } from "./properties/namespace.text-property.ts"
import type { Replicas } from "./properties/replicas.number-property.ts"
import type { ResourceKind } from "./properties/resource-kind.text-property.ts"
import type { ResourceName } from "./properties/resource-name.text-property.ts"

export type ClusterService = Service & {
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
  image: Image
  replicas: Replicas
  containerPort: ContainerPort
  manifestCode: ManifestCode
}

export const clusterService = {
  id: "01a05a41-58c2-7cbb-bfed-c234697164e3",
  pageTypeSlug: "page-type",
  slug: "cluster-service",
  definition: "a service the cluster runs as a workload",
  pluralSlug: "cluster-services",
  extendsSlug: "page-type/service",
  partSlugs: [
    "cluster-service/alanwalton-atlas",
    "cluster-service/alanwalton-web",
    "cluster-service/archive-of-worlds-web",
    "cluster-service/audhdalan-web",
    "cluster-service/smilingjenny-web",
    "cluster-service/temper-web",
    "number-property/container-port",
    "number-property/replicas",
    "text-property/image",
    "text-property/manifest-code",
    "text-property/namespace",
    "text-property/resource-kind",
    "text-property/resource-name",
  ],
  properties: [
    { pagePropertySlug: "resource-kind", required: true, many: false },
    { pagePropertySlug: "namespace", required: true, many: false },
    { pagePropertySlug: "resource-name", required: true, many: false },
    { pagePropertySlug: "image", required: true, many: false },
    { pagePropertySlug: "replicas", required: true, many: false },
    { pagePropertySlug: "container-port", required: true, many: false },
    { pagePropertySlug: "manifest-code", required: true, many: false },
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
      statement:
        "A cluster service runs one copy unless the cluster service is spread across nodes on purpose.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service stands under the domain the cluster service serves.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service's page states the shape of the workload it is.",
    },
    {
      invariantKind: "gap",
      statement: "The manifests a cluster service is applied as are emitted from its own page.",
    },
  ],
} as const satisfies PageType
