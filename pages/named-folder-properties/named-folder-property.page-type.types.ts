import type { FolderName } from "akasha/pages/named-folder-properties/properties/folder-name.text-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type NamedFolderProperty = PageProperty & {
  folderName: FolderName
}
