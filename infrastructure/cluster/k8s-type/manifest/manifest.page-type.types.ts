import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { BuildEnv } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/build-env.one-of-property.types.ts"
import type { GeneratedDirectory } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/generated-directory.build-folder-property.types.ts"
import type { ManifestCode } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/manifest-code.code-file-property.types.ts"
import type { MaxCpuMillicores } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/max-cpu-millicores.number-property.types.ts"
import type { MinCpuMillicores } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/min-cpu-millicores.number-property.types.ts"
import type { MinMemoryMb } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/min-memory-mb.number-property.types.ts"
import type { KillMemoryMb } from "akasha/infrastructure/memory/limit/properties/kill-memory-mb.number-property.types.ts"

export type Manifest = Domain & {
  code: ManifestCode
  generatedDirectory?: GeneratedDirectory
  buildEnv?: BuildEnv
  killMemoryMb?: KillMemoryMb
  minCpuMillicores?: MinCpuMillicores
  maxCpuMillicores?: MaxCpuMillicores
  minMemoryMb?: MinMemoryMb
}
