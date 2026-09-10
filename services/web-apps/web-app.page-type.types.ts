import type { Domain } from "../../domains/domain.page-type.ts"
import type { BuildCommand } from "./properties/build-command.text-property.ts"
import type { ClusterServices } from "./properties/cluster-services.relation-property.ts"
import type { Hostnames } from "./properties/hostnames.text-property.ts"
import type { SourceDirectory } from "./properties/source-directory.text-property.ts"

export type WebApp = Domain & {
  sourceDirectory: SourceDirectory
  buildCommand: BuildCommand
  clusterServices: ClusterServices
  hostnames?: Hostnames
}
