import type { FolderName } from "akasha/page/named-folder-property/properties/folder-name.text-property.types.ts"
import type { TrueProperty } from "akasha/page/true-property/true-property.page-type.types.ts"
import type { HoldsBytes } from "akasha/page/type/page-property/properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "akasha/page/type/page-property/properties/runs-file-length.boolean-property.types.ts"

export type NamedFolderProperty = TrueProperty & {
  folderName: FolderName
  holdsBytes?: HoldsBytes
  runsFileLength?: RunsFileLength
}
