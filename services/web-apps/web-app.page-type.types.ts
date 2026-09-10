import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { BasePort } from "./properties/base-port.number-property.types.ts"
import type { BuildCommand } from "./properties/build-command.text-property.ts"
import type { ClusterServices } from "./properties/cluster-services.relation-property.types.ts"
import type { Hostnames } from "./properties/hostnames.text-property.ts"
import type { SecretResource } from "./properties/secret-resource.text-property.ts"
import type { SourceDirectory } from "./properties/source-directory.text-property.ts"

export type WebApp = Domain & {
  sourceDirectory: SourceDirectory
  buildCommand: BuildCommand
  clusterServices: ClusterServices
  hostnames?: Hostnames
  secretResource: SecretResource
  basePort?: BasePort
}
