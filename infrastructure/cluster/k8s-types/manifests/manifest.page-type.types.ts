import type { Domain } from "../../../../domains/domain.page-type.types.ts"
import type { GeneratedDirectory } from "./properties/generated-directory.build-folder-property.ts"
import type { ManifestCode } from "./properties/manifest-code.code-file-property.ts"

export type Manifest = Domain & {
  code: ManifestCode
  generatedDirectory?: GeneratedDirectory
}
