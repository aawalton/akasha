import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { BasePort } from "akasha/infrastructure/services/web-apps/properties/base-port.number-property.types.ts"
import type { BuildCommand } from "akasha/infrastructure/services/web-apps/properties/build-command.text-property.types.ts"
import type { Hostnames } from "akasha/infrastructure/services/web-apps/properties/hostnames.text-property.types.ts"
import type { SecretResource } from "akasha/infrastructure/services/web-apps/properties/secret-resource.text-property.types.ts"
import type { ServiceClusters } from "akasha/infrastructure/services/web-apps/properties/service-clusters.relation-property.types.ts"
import type { SourceDirectory } from "akasha/infrastructure/services/web-apps/properties/source-directory.text-property.types.ts"

export type WebApp = Domain & {
  sourceDirectory: SourceDirectory
  buildCommand: BuildCommand
  serviceClusters: ServiceClusters
  hostnames?: Hostnames
  secretResource: SecretResource
  basePort?: BasePort
}
