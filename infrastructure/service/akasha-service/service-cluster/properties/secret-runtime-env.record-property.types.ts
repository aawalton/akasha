import type { RuntimeEnvName } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/runtime-env-name.text-property.types.ts"
import type { RuntimeEnvSecret } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/runtime-env-secret.record-property.types.ts"

export type SecretRuntimeEnv = {
  name: RuntimeEnvName
  fromSecret: RuntimeEnvSecret
}
