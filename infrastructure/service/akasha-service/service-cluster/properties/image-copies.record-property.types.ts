import type { CopiedFiles } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/copied-files.text-property.types.ts"
import type { CopyEnv } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/copy-env.text-property.types.ts"
import type { CopyFrom } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/copy-from.text-property.types.ts"
import type { CopyImage } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/copy-image.text-property.types.ts"
import type { CopyTo } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/copy-to.text-property.types.ts"
import type { SourceHash } from "akasha/infrastructure/service/akasha-service/service-cluster/properties/source-hash.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ImageCopies = List<{
  image: CopyImage
  copyFrom: CopyFrom
  copyTo: CopyTo
  copiedFiles: CopiedFiles
  copyEnv: CopyEnv
  sourceHash?: SourceHash
}>
