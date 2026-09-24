import type { ResourceKey } from "akasha/infrastructure/service/akasha-service/secret/properties/resource-key.text-property.types.ts"
import type { ResourceName } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/resource-name.text-property.types.ts"

export type BuildEnvSecret = {
  resourceName: ResourceName
  resourceKey: ResourceKey
}
