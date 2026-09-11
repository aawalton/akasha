import type { ResourceName } from "akasha/infrastructure/cluster/services/properties/resource-name.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { ResourceKey } from "akasha/services/secrets/properties/resource-key.text-property.types.ts"

export type Placements = List<{
  resourceName: ResourceName
  resourceKey: ResourceKey
}>
