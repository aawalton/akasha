import type { Service } from "../../../services/service.page-type.types.ts"
import type { ClusterServiceConfig } from "./properties/cluster-service-config.file-property.ts"
import type { ClusterServiceManifest } from "./properties/cluster-service-manifest.relation-property.ts"
import type { ClusterServiceSchedule } from "./properties/cluster-service-schedule.text-property.ts"
import type { ContainerPort } from "./properties/container-port.number-property.ts"
import type { Image } from "./properties/image.text-property.ts"
import type { Namespace } from "./properties/namespace.text-property.ts"
import type { Replicas } from "./properties/replicas.number-property.ts"
import type { ResourceKind } from "./properties/resource-kind.text-property.ts"
import type { ResourceName } from "./properties/resource-name.text-property.ts"
import type { Secrets } from "./properties/secrets.relation-property.ts"

export type ClusterService = Service & {
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
  image: Image
  replicas?: Replicas
  containerPort?: ContainerPort
  schedule?: ClusterServiceSchedule
  manifest: ClusterServiceManifest
  config?: ClusterServiceConfig
  secrets?: Secrets
}
