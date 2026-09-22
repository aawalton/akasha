import type { ResourceName } from "akasha/infrastructure/service/cluster/properties/resource-name.text-property.types.ts"
import type { ResourceKey } from "akasha/infrastructure/service/secret/properties/resource-key.text-property.types.ts"

export type BuildEnvSecret = {
  resourceName: ResourceName
  resourceKey: ResourceKey
}
