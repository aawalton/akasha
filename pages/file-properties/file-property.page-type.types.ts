import type { Extensions } from "akasha/pages/file-properties/properties/extensions.text-property.types.ts"
import type { FileName } from "akasha/pages/file-properties/properties/file-name.text-property.types.ts"
import type { FileWrittenBy } from "akasha/pages/file-properties/properties/file-written-by.relation-property.types.ts"
import type { Generated } from "akasha/pages/file-properties/properties/generated.boolean-property.types.ts"
import type { HoldsBytes } from "akasha/pages/file-properties/properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "akasha/pages/file-properties/properties/runs-file-length.boolean-property.types.ts"
import type { ToolResolvesPaths } from "akasha/pages/file-properties/properties/tool-resolves-paths.boolean-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type FileProperty = PageProperty & {
  fileName?: FileName
  generated?: Generated
  runsFileLength?: RunsFileLength
  holdsBytes?: HoldsBytes
  toolResolvesPaths?: ToolResolvesPaths
  writtenBy?: FileWrittenBy
  extensions?: Extensions
}
