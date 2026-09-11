import type { ClusterServiceConfig } from "akasha/services/clusters/properties/cluster-service-config.file-property.types.ts"
import type { ClusterServiceManifest } from "akasha/services/clusters/properties/cluster-service-manifest.relation-property.types.ts"
import type { ClusterServiceSchedule } from "akasha/services/clusters/properties/cluster-service-schedule.text-property.types.ts"
import type { ContainerPort } from "akasha/services/clusters/properties/container-port.number-property.types.ts"
import type { Image } from "akasha/services/clusters/properties/image.text-property.types.ts"
import type { Namespace } from "akasha/services/clusters/properties/namespace.text-property.types.ts"
import type { Replicas } from "akasha/services/clusters/properties/replicas.number-property.types.ts"
import type { ResourceKind } from "akasha/services/clusters/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/services/clusters/properties/resource-name.text-property.types.ts"
import type { Secrets } from "akasha/services/clusters/properties/secrets.relation-property.types.ts"
import type { Service } from "akasha/services/service.page-type.types.ts"

export type ServiceCluster = Service & {
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
