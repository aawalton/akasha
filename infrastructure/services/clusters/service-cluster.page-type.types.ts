import type { ContainerPort } from "akasha/infrastructure/services/clusters/properties/container-port.number-property.types.ts"
import type { Image } from "akasha/infrastructure/services/clusters/properties/image.text-property.types.ts"
import type { Namespace } from "akasha/infrastructure/services/clusters/properties/namespace.text-property.types.ts"
import type { Replicas } from "akasha/infrastructure/services/clusters/properties/replicas.number-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/services/clusters/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/services/clusters/properties/resource-name.text-property.types.ts"
import type { Secrets } from "akasha/infrastructure/services/clusters/properties/secrets.relation-property.types.ts"
import type { ServiceClusterConfig } from "akasha/infrastructure/services/clusters/properties/service-cluster-config.file-property.types.ts"
import type { ServiceClusterManifest } from "akasha/infrastructure/services/clusters/properties/service-cluster-manifest.relation-property.types.ts"
import type { ServiceClusterSchedule } from "akasha/infrastructure/services/clusters/properties/service-cluster-schedule.text-property.types.ts"
import type { Service } from "akasha/infrastructure/services/service.page-type.types.ts"

export type ServiceCluster = Service & {
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
  image: Image
  replicas?: Replicas
  containerPort?: ContainerPort
  schedule?: ServiceClusterSchedule
  manifest: ServiceClusterManifest
  config?: ServiceClusterConfig
  secrets?: Secrets
}
