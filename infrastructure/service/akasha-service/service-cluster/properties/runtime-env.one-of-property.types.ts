import type { SecretRuntimeEnv } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/secret-runtime-env.record-property.types.ts"
import type { StatedRuntimeEnv } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/stated-runtime-env.record-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type RuntimeEnv = List<StatedRuntimeEnv | SecretRuntimeEnv>
