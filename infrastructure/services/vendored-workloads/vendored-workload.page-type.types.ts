import type { Namespace } from "akasha/infrastructure/services/clusters/properties/namespace.text-property.types.ts"
import type { ResourceKind } from "akasha/infrastructure/services/clusters/properties/resource-kind.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/services/clusters/properties/resource-name.text-property.types.ts"
import type { Service } from "akasha/infrastructure/services/service.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type VendoredWorkload = Service & {
  title: Title
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
}
