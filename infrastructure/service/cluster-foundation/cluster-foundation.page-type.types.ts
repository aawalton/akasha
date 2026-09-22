import type { ServiceManifest } from "akasha/infrastructure/service/cluster/properties/service-manifest.multi-relation-property.types.ts"
import type { Service } from "akasha/infrastructure/service/service.page-type.types.ts"

export type ClusterFoundation = Service & {
  manifest: ServiceManifest
}
