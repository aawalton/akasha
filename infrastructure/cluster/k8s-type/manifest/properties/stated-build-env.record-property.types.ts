import type { BuildEnvName } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/build-env-name.text-property.types.ts"
import type { BuildEnvValue } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/build-env-value.text-property.types.ts"

export type StatedBuildEnv = {
  name: BuildEnvName
  value: BuildEnvValue
}
