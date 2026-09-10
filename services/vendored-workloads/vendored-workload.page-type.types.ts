import type { Namespace } from "../../infrastructure/cluster/services/properties/namespace.text-property.ts"
import type { ResourceKind } from "../../infrastructure/cluster/services/properties/resource-kind.text-property.ts"
import type { ResourceName } from "../../infrastructure/cluster/services/properties/resource-name.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Service } from "../service.page-type.types.ts"

export type VendoredWorkload = Service & {
  title: Title
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
}
