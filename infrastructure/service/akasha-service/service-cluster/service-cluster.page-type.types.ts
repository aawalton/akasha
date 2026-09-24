import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { ContainerPort } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/container-port.number-property.types.ts"
import type { Image } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/image.text-property.types.ts"
import type { InstanceLabel } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/instance-label.text-property.types.ts"
import type { Namespace } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/namespace.text-property.types.ts"
import type { OwnsNamespace } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/owns-namespace.boolean-property.types.ts"
import type { ProbePath } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/probe-path.text-property.types.ts"
import type { Replicas } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/replicas.number-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/resource-name.text-property.types.ts"
import type { Secrets } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/secrets.multi-relation-property.types.ts"
import type { ServiceClusterConfig } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/service-cluster-config.file-property.types.ts"
import type { ServiceClusterSchedule } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/service-cluster-schedule.text-property.types.ts"
import type { ServiceManifest } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/service-manifest.multi-relation-property.types.ts"
import type { WorkloadClass } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/workload-class.select-property.types.ts"
import type { Well } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/well.boolean-property.types.ts"

export type ServiceCluster = AkashaService & {
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
  well?: Well
  probePath?: ProbePath
  workloadClass?: WorkloadClass
  ownsNamespace?: OwnsNamespace
  instanceLabel?: InstanceLabel
}
