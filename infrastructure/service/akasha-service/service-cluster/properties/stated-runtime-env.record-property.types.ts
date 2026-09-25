import type { RuntimeEnvName } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/runtime-env-name.text-property.types.ts"
import type { RuntimeEnvValue } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/runtime-env-value.text-property.types.ts"

export type StatedRuntimeEnv = {
  name: RuntimeEnvName
  value: RuntimeEnvValue
}
