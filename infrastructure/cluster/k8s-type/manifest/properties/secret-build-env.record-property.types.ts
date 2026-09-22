import type { BuildEnvName } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/build-env-name.text-property.types.ts"
import type { BuildEnvSecret } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/build-env-secret.record-property.types.ts"

export type SecretBuildEnv = {
  name: BuildEnvName
  fromSecret: BuildEnvSecret
}
