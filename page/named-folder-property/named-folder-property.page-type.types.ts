import type { HoldsBytes } from "akasha/page/file-property/properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "akasha/page/file-property/properties/runs-file-length.boolean-property.types.ts"
import type { FolderName } from "akasha/page/named-folder-property/properties/folder-name.text-property.types.ts"
import type { TrueProperty } from "akasha/page/true-property/true-property.page-type.types.ts"

export type NamedFolderProperty = TrueProperty & {
  folderName: FolderName
  holdsBytes?: HoldsBytes
  runsFileLength?: RunsFileLength
}
