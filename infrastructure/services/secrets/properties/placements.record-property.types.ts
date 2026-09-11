import type { ResourceName } from "akasha/infrastructure/services/clusters/properties/resource-name.text-property.types.ts"
import type { ResourceKey } from "akasha/infrastructure/services/secrets/properties/resource-key.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Placements = List<{
  resourceName: ResourceName
  resourceKey: ResourceKey
}>
