import type { MinMemoryMb } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/min-memory-mb.number-property.types.ts"
import type { KillMemoryMb } from "akasha/infrastructure/memory/limit/properties/kill-memory-mb.number-property.types.ts"
import type { CodeCachePath } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/code-cache-path.text-property.types.ts"

export type CodeSync = {
  cachePath: CodeCachePath
  minMemoryMb: MinMemoryMb
  killMemoryMb: KillMemoryMb
}
