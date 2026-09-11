import type { ClusterServiceConfig } from "akasha/infrastructure/cluster/services/properties/cluster-service-config.file-property.ts"
import type { ClusterServiceManifest } from "akasha/infrastructure/cluster/services/properties/cluster-service-manifest.relation-property.types.ts"
import type { ClusterServiceSchedule } from "akasha/infrastructure/cluster/services/properties/cluster-service-schedule.text-property.ts"
import type { ContainerPort } from "akasha/infrastructure/cluster/services/properties/container-port.number-property.types.ts"
import type { Image } from "akasha/infrastructure/cluster/services/properties/image.text-property.ts"
import type { Namespace } from "akasha/infrastructure/cluster/services/properties/namespace.text-property.ts"
import type { Replicas } from "akasha/infrastructure/cluster/services/properties/replicas.number-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/cluster/services/properties/resource-kind.text-property.ts"
import type { ResourceName } from "akasha/infrastructure/cluster/services/properties/resource-name.text-property.ts"
import type { Secrets } from "akasha/infrastructure/cluster/services/properties/secrets.relation-property.types.ts"
import type { Service } from "akasha/services/service.page-type.types.ts"

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
