import type { Namespace } from "akasha/infrastructure/cluster/services/properties/namespace.text-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/cluster/services/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/cluster/services/properties/resource-name.text-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { Service } from "akasha/services/service.page-type.types.ts"

export type VendoredWorkload = Service & {
  title: Title
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
}
