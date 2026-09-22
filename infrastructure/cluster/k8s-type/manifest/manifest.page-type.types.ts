import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { BuildEnv } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/build-env.one-of-property.types.ts"
import type { GeneratedDirectory } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/generated-directory.build-folder-property.types.ts"
import type { ManifestCode } from "akasha/infrastructure/cluster/k8s-type/manifest/properties/manifest-code.code-file-property.types.ts"

export type Manifest = Domain & {
  code: ManifestCode
  generatedDirectory?: GeneratedDirectory
  buildEnv?: BuildEnv
}
