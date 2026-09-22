import type { ContainerPort } from "akasha/infrastructure/service/cluster/properties/container-port.number-property.types.ts"
import type { Image } from "akasha/infrastructure/service/cluster/properties/image.text-property.types.ts"
import type { Namespace } from "akasha/infrastructure/service/cluster/properties/namespace.text-property.types.ts"
import type { Replicas } from "akasha/infrastructure/service/cluster/properties/replicas.number-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/service/cluster/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/service/cluster/properties/resource-name.text-property.types.ts"
import type { Secrets } from "akasha/infrastructure/service/cluster/properties/secrets.relation-property.types.ts"
import type { ServiceClusterConfig } from "akasha/infrastructure/service/cluster/properties/service-cluster-config.file-property.types.ts"
import type { ServiceClusterSchedule } from "akasha/infrastructure/service/cluster/properties/service-cluster-schedule.text-property.types.ts"
import type { ServiceManifest } from "akasha/infrastructure/service/cluster/properties/service-manifest.multi-relation-property.types.ts"
import type { Service } from "akasha/infrastructure/service/service.page-type.types.ts"

export type ServiceCluster = Service & {
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
  image: Image
  replicas?: Replicas
  containerPort?: ContainerPort
  schedule?: ServiceClusterSchedule
  manifest: ServiceManifest
  config?: ServiceClusterConfig
  secrets?: Secrets
}
