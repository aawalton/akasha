import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { ServiceManifest } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/service-manifest.multi-relation-property.types.ts"

export type ClusterFoundation = AkashaService & {
  manifest: ServiceManifest
}
