import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { GeneratedDirectory } from "akasha/infrastructure/cluster/k8s-types/manifests/properties/generated-directory.build-folder-property.types.ts"
import type { ManifestCode } from "akasha/infrastructure/cluster/k8s-types/manifests/properties/manifest-code.code-file-property.ts"

export type Manifest = Domain & {
  code: ManifestCode
  generatedDirectory?: GeneratedDirectory
}
