import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { BasePort } from "akasha/infrastructure/service/akasha-service/web-app/properties/base-port.number-property.types.ts"
import type { BuildCommand } from "akasha/infrastructure/service/akasha-service/web-app/properties/build-command.text-property.types.ts"
import type { SecretResource } from "akasha/infrastructure/service/akasha-service/web-app/properties/secret-resource.text-property.types.ts"
import type { ServiceClusters } from "akasha/infrastructure/service/akasha-service/web-app/properties/service-clusters.multi-relation-property.types.ts"
import type { SourceDirectory } from "akasha/infrastructure/service/akasha-service/web-app/properties/source-directory.text-property.types.ts"

export type WebApp = AkashaService & {
  sourceDirectory: SourceDirectory
  buildCommand: BuildCommand
  serviceClusters: ServiceClusters
  secretResource: SecretResource
  basePort?: BasePort
}
