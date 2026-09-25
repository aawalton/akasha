import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { ServiceManifest } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/service-manifest.multi-relation-property.types.ts"
import type { Well } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/well.boolean-property.types.ts"

export type ClusterFoundation = AkashaService & {
  manifest: ServiceManifest
  well?: Well
}
