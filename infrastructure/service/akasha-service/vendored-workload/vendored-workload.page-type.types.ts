import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { Namespace } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/namespace.text-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/resource-name.text-property.types.ts"
import type { Well } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/well.boolean-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type VendoredWorkload = AkashaService & {
  title: Title
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
  well?: Well
}
