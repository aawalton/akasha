import type { HoldsBytes } from "akasha/pages/file-properties/properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "akasha/pages/file-properties/properties/runs-file-length.boolean-property.types.ts"
import type { FolderName } from "akasha/pages/named-folder-properties/properties/folder-name.text-property.types.ts"
import type { TrueProperty } from "akasha/pages/true-properties/true-property.page-type.types.ts"

export type NamedFolderProperty = TrueProperty & {
  folderName: FolderName
  holdsBytes?: HoldsBytes
  runsFileLength?: RunsFileLength
}
