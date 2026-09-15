import type { AppendOnly } from "akasha/page/file-property/properties/append-only.boolean-property.types.ts"
import type { Extensions } from "akasha/page/file-property/properties/extensions.text-property.types.ts"
import type { FileName } from "akasha/page/file-property/properties/file-name.text-property.types.ts"
import type { FileWrittenBy } from "akasha/page/file-property/properties/file-written-by.relation-property.types.ts"
import type { Generated } from "akasha/page/file-property/properties/generated.boolean-property.types.ts"
import type { HoldsBytes } from "akasha/page/file-property/properties/holds-bytes.boolean-property.types.ts"
import type { KeptForHours } from "akasha/page/file-property/properties/kept-for-hours.number-property.types.ts"
import type { RunsFileLength } from "akasha/page/file-property/properties/runs-file-length.boolean-property.types.ts"
import type { ToolResolvesPaths } from "akasha/page/file-property/properties/tool-resolves-paths.boolean-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type FileProperty = PageProperty & {
  fileName?: FileName
  generated?: Generated
  runsFileLength?: RunsFileLength
  holdsBytes?: HoldsBytes
  toolResolvesPaths?: ToolResolvesPaths
  writtenBy?: FileWrittenBy
  extensions: Extensions
  appendOnly?: AppendOnly
  keptForHours?: KeptForHours
}
