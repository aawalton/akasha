import type { ResourceKey } from "akasha/infrastructure/service/akasha-service/secret/properties/resource-key.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/resource-name.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Placements = List<{
  resourceName: ResourceName
  resourceKey: ResourceKey
}>
