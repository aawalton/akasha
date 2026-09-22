import type { SecretBuildEnv } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/secret-build-env.record-property.types.ts"
import type { StatedBuildEnv } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/stated-build-env.record-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type BuildEnv = List<StatedBuildEnv | SecretBuildEnv>
